<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Sistema simples de JSON
$dataDir = __DIR__ . '/data';
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0777, true);
}

function lerJson($arquivo) {
    global $dataDir;
    $caminho = "$dataDir/$arquivo.json";
    if (!file_exists($caminho)) {
        return [];
    }
    return json_decode(file_get_contents($caminho), true) ?: [];
}

function escreverJson($arquivo, $dados) {
    global $dataDir;
    $caminho = "$dataDir/$arquivo.json";
    file_put_contents($caminho, json_encode($dados, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function proximoId($dados) {
    return empty($dados) ? 1 : max(array_column($dados, 'id')) + 1;
}

// Inicializar dados padrão
$usuarios = lerJson('usuarios');
if (empty($usuarios)) {
    $usuarios = [[
        'id' => 1,
        'email' => 'admin@academia.com',
        'senha' => password_hash('admin123', PASSWORD_DEFAULT),
        'nome' => 'Admin'
    ]];
    escreverJson('usuarios', $usuarios);
}

$planos = lerJson('planos');
if (empty($planos)) {
    $planos = [
        ['id' => 1, 'nome' => 'Mensal', 'valor' => 89.90],
        ['id' => 2, 'nome' => 'Trimestral', 'valor' => 249.90],
        ['id' => 3, 'nome' => 'Anual', 'valor' => 899.90]
    ];
    escreverJson('planos', $planos);
}

// Rotas
$rota = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Remover /index.php ou /api.php se estiver no caminho
$rota = preg_replace('#^/(index|api)\.php#', '', $rota);
// Se estiver rodando direto pelo servidor PHP, pegar só a rota
if (strpos($rota, '/backend') !== false) {
    $rota = str_replace('/backend', '', $rota);
}
if (empty($rota) || $rota === '/') {
    // Se acessar a raiz, retornar info da API
    echo json_encode(['mensagem' => 'API funcionando! Use /api/login, /api/membros, etc.']);
    exit;
}
$metodo = $_SERVER['REQUEST_METHOD'];
$dados = json_decode(file_get_contents('php://input'), true) ?: [];

// Login
if ($rota === '/api/login' && $metodo === 'POST') {
    $usuario = null;
    foreach ($usuarios as $u) {
        if ($u['email'] === $dados['email']) {
            $usuario = $u;
            break;
        }
    }
    
    if ($usuario && password_verify($dados['senha'], $usuario['senha'])) {
        echo json_encode(['sucesso' => true, 'usuario' => ['id' => $usuario['id'], 'nome' => $usuario['nome'], 'email' => $usuario['email']]]);
    } else {
        http_response_code(401);
        echo json_encode(['sucesso' => false, 'mensagem' => 'Email ou senha incorretos']);
    }
    exit;
}

// Membros
if ($rota === '/api/membros' && $metodo === 'GET') {
    $membros = lerJson('membros');
    $planos = lerJson('planos');
    foreach ($membros as &$m) {
        foreach ($planos as $p) {
            if ($p['id'] == ($m['plano_id'] ?? 0)) {
                $m['plano_nome'] = $p['nome'];
                break;
            }
        }
    }
    echo json_encode(['sucesso' => true, 'dados' => $membros]);
    exit;
}

if ($rota === '/api/membros' && $metodo === 'POST') {
    $membros = lerJson('membros');
    $novo = $dados;
    $novo['id'] = proximoId($membros);
    $novo['data_ingresso'] = date('Y-m-d');
    $membros[] = $novo;
    escreverJson('membros', $membros);
    echo json_encode(['sucesso' => true, 'id' => $novo['id']]);
    exit;
}

if (preg_match('#/api/membros/(\d+)#', $rota, $matches) && $metodo === 'PUT') {
    $id = $matches[1];
    $membros = lerJson('membros');
    foreach ($membros as &$m) {
        if ($m['id'] == $id) {
            $m = array_merge($m, $dados);
            escreverJson('membros', $membros);
            echo json_encode(['sucesso' => true]);
            exit;
        }
    }
    http_response_code(404);
    echo json_encode(['sucesso' => false]);
    exit;
}

if (preg_match('#/api/membros/(\d+)#', $rota, $matches) && $metodo === 'DELETE') {
    $id = $matches[1];
    $membros = lerJson('membros');
    $membros = array_filter($membros, fn($m) => $m['id'] != $id);
    escreverJson('membros', array_values($membros));
    echo json_encode(['sucesso' => true]);
    exit;
}

// Planos
if ($rota === '/api/planos' && $metodo === 'GET') {
    echo json_encode(['sucesso' => true, 'dados' => lerJson('planos')]);
    exit;
}

if ($rota === '/api/planos' && $metodo === 'POST') {
    $planos = lerJson('planos');
    $novo = $dados;
    $novo['id'] = proximoId($planos);
    $planos[] = $novo;
    escreverJson('planos', $planos);
    echo json_encode(['sucesso' => true, 'id' => $novo['id']]);
    exit;
}

if (preg_match('#/api/planos/(\d+)#', $rota, $matches) && $metodo === 'PUT') {
    $id = $matches[1];
    $planos = lerJson('planos');
    foreach ($planos as &$p) {
        if ($p['id'] == $id) {
            $p = array_merge($p, $dados);
            escreverJson('planos', $planos);
            echo json_encode(['sucesso' => true]);
            exit;
        }
    }
    http_response_code(404);
    echo json_encode(['sucesso' => false]);
    exit;
}

if (preg_match('#/api/planos/(\d+)#', $rota, $matches) && $metodo === 'DELETE') {
    $id = $matches[1];
    $planos = lerJson('planos');
    $planos = array_filter($planos, fn($p) => $p['id'] != $id);
    escreverJson('planos', array_values($planos));
    echo json_encode(['sucesso' => true]);
    exit;
}

// Treinos
if ($rota === '/api/treinos' && $metodo === 'GET') {
    $treinos = lerJson('treinos');
    $membros = lerJson('membros');
    foreach ($treinos as &$t) {
        foreach ($membros as $m) {
            if ($m['id'] == $t['membro_id']) {
                $t['membro_nome'] = $m['nome'];
                break;
            }
        }
    }
    echo json_encode(['sucesso' => true, 'dados' => $treinos]);
    exit;
}

if ($rota === '/api/treinos' && $metodo === 'POST') {
    $treinos = lerJson('treinos');
    $novo = $dados;
    $novo['id'] = proximoId($treinos);
    $novo['data_treino'] = $novo['data_treino'] ?? date('Y-m-d H:i:s');
    $treinos[] = $novo;
    escreverJson('treinos', $treinos);
    echo json_encode(['sucesso' => true, 'id' => $novo['id']]);
    exit;
}

if (preg_match('#/api/treinos/(\d+)#', $rota, $matches) && $metodo === 'PUT') {
    $id = $matches[1];
    $treinos = lerJson('treinos');
    foreach ($treinos as &$t) {
        if ($t['id'] == $id) {
            $t = array_merge($t, $dados);
            escreverJson('treinos', $treinos);
            echo json_encode(['sucesso' => true]);
            exit;
        }
    }
    http_response_code(404);
    echo json_encode(['sucesso' => false]);
    exit;
}

if (preg_match('#/api/treinos/(\d+)#', $rota, $matches) && $metodo === 'DELETE') {
    $id = $matches[1];
    $treinos = lerJson('treinos');
    $treinos = array_filter($treinos, fn($t) => $t['id'] != $id);
    escreverJson('treinos', array_values($treinos));
    echo json_encode(['sucesso' => true]);
    exit;
}

http_response_code(404);
echo json_encode(['sucesso' => false, 'mensagem' => 'Rota não encontrada']);
?>

