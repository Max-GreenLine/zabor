<?php
// Приёмник заявок -> Telegram.
// На хостинге рядом с этим файлом создать два файла (в git их НЕТ):
//   tg_token.txt — токен бота от @BotFather
//   tg_chat.txt  — chat_id, куда слать заявки
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$secretsDirs = [dirname(__DIR__, 3) . '/secrets', __DIR__];  // вне докрута; запасной вариант — рядом
$tokenFile = $chatFile = null;
foreach ($secretsDirs as $dir) {
    if (is_file("$dir/tg_token.txt") && is_file("$dir/tg_chat.txt")) { $tokenFile = "$dir/tg_token.txt"; $chatFile = "$dir/tg_chat.txt"; break; }
}
if (!$tokenFile) { http_response_code(500); exit('{"ok":false,"err":"not configured"}'); }
$token = trim(file_get_contents($tokenFile));
$chat  = trim(file_get_contents($chatFile));

$d = json_decode(file_get_contents('php://input'), true);
$phone = isset($d['phone']) ? preg_replace('/\D/', '', $d['phone']) : '';
$text  = isset($d['text']) ? trim($d['text']) : '';
if (strlen($phone) < 10 || $text === '' || mb_strlen($text) > 3000) { http_response_code(400); exit('{"ok":false,"err":"bad request"}'); }

// простейшая защита от долбёжки: не чаще 1 заявки в 5 сек с одного IP
$lock = sys_get_temp_dir() . '/lead_' . md5($_SERVER['REMOTE_ADDR'] ?? '');
if (is_file($lock) && time() - filemtime($lock) < 5) { http_response_code(429); exit('{"ok":false,"err":"slow down"}'); }
touch($lock);

$ch = curl_init("https://api.telegram.org/bot{$token}/sendMessage");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query(['chat_id' => $chat, 'text' => $text]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
]);
$res  = curl_exec($ch);
$err  = curl_error($ch);
$code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
curl_close($ch);
if ($res === false || $code !== 200) {
    @file_put_contents(sys_get_temp_dir() . '/lead_err.log', date('c') . " code=$code err=$err res=" . substr((string)$res, 0, 300) . "\n", FILE_APPEND);
    http_response_code(502);
    exit('{"ok":false,"err":"telegram unreachable"}');
}
echo '{"ok":true}';
