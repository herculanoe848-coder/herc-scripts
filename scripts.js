/* Catálogo de exemplos educativos para Roblox Studio.
   Todos os exemplos são destinados a experiências que você cria ou administra. */
window.HERC_SCRIPTS = [
  {
    id: "leaderstats-moedas", title: "Leaderstats: moedas", category: "Jogadores", icon: "LS",
    level: "Iniciante", place: "ServerScriptService", featured: true,
    description: "Cria uma pasta leaderstats com um contador de moedas para cada jogador que entrar.",
    tags: ["leaderstats", "moedas", "players", "placar", "pontuação"],
    code: `local Players = game:GetService("Players")\n\nPlayers.PlayerAdded:Connect(function(player)\n    local leaderstats = Instance.new("Folder")\n    leaderstats.Name = "leaderstats"\n    leaderstats.Parent = player\n\n    local coins = Instance.new("IntValue")\n    coins.Name = "Moedas"\n    coins.Value = 0\n    coins.Parent = leaderstats\nend)`
  },
  {
    id: "mensagem-boas-vindas", title: "Boas-vindas no chat", category: "Jogadores", icon: "HI",
    level: "Iniciante", place: "ServerScriptService", featured: true,
    description: "Exibe uma mensagem de boas-vindas quando um jogador entra na experiência.",
    tags: ["playeradded", "chat", "mensagem", "entrada"],
    code: `local Players = game:GetService("Players")\n\nPlayers.PlayerAdded:Connect(function(player)\n    print("Boas-vindas, " .. player.Name .. "!")\nend)`
  },
  {
    id: "respawn-personalizado", title: "Tempo de respawn", category: "Jogadores", icon: "RS",
    level: "Iniciante", place: "ServerScriptService", featured: false,
    description: "Define o tempo que o jogador espera para renascer depois de ser eliminado.",
    tags: ["respawn", "morte", "personagem", "player"],
    code: `local Players = game:GetService("Players")\n\nPlayers.RespawnTime = 5 -- segundos`
  },
  {
    id: "botao-interface", title: "Botão com clique", category: "Interface", icon: "UI",
    level: "Iniciante", place: "LocalScript dentro de TextButton", featured: true,
    description: "Detecta o clique em um botão de interface e altera o texto exibido.",
    tags: ["gui", "button", "interface", "clique", "textbutton"],
    code: `local button = script.Parent\n\nbutton.Activated:Connect(function()\n    button.Text = "Você clicou!"\nend)`
  },
  {
    id: "mostrar-esconder-painel", title: "Mostrar / esconder painel", category: "Interface", icon: "GUI",
    level: "Iniciante", place: "LocalScript dentro de TextButton", featured: false,
    description: "Alterna a visibilidade de um painel da interface ao apertar um botão.",
    tags: ["gui", "frame", "painel", "visibilidade", "toggle"],
    code: `local button = script.Parent\nlocal panel = button.Parent:WaitForChild("Painel")\n\nbutton.Activated:Connect(function()\n    panel.Visible = not panel.Visible\nend)`
  },
  {
    id: "notificacao-local", title: "Notificação simples", category: "Interface", icon: "NT",
    level: "Intermediário", place: "LocalScript em StarterPlayerScripts", featured: false,
    description: "Mostra uma notificação nativa para o jogador local usando StarterGui.",
    tags: ["notificação", "startergui", "toast", "mensagem"],
    code: `local StarterGui = game:GetService("StarterGui")\n\nStarterGui:SetCore("SendNotification", {\n    Title = "herc_scripts",\n    Text = "Boa partida!",\n    Duration = 4\n})`
  },
  {
    id: "plataforma-velocidade", title: "Plataforma de velocidade", category: "Mecânicas", icon: "SPD",
    level: "Intermediário", place: "Script dentro de uma Part", featured: true,
    description: "Aumenta temporariamente a velocidade de quem tocar na peça. Ideal para um power-up.",
    tags: ["speed", "velocidade", "touched", "powerup", "part"],
    code: `local part = script.Parent\nlocal BOOST_SPEED = 28\nlocal BOOST_TIME = 4\nlocal cooldown = {}\n\npart.Touched:Connect(function(hit)\n    local character = hit.Parent\n    local humanoid = character and character:FindFirstChildOfClass("Humanoid")\n    if not humanoid or cooldown[humanoid] then return end\n\n    cooldown[humanoid] = true\n    local oldSpeed = humanoid.WalkSpeed\n    humanoid.WalkSpeed = BOOST_SPEED\n    task.wait(BOOST_TIME)\n    if humanoid.Parent then humanoid.WalkSpeed = oldSpeed end\n    cooldown[humanoid] = nil\nend)`
  },
  {
    id: "checkpoint-obby", title: "Checkpoint para obby", category: "Mecânicas", icon: "CP",
    level: "Intermediário", place: "Script dentro de cada checkpoint (Part)", featured: true,
    description: "Salva o checkpoint tocado durante a sessão e reposiciona o personagem ao renascer.",
    tags: ["obby", "checkpoint", "spawn", "touched", "parkour"],
    code: `local Players = game:GetService("Players")\nlocal checkpoint = script.Parent\n\ncheckpoint.Touched:Connect(function(hit)\n    local character = hit.Parent\n    local player = Players:GetPlayerFromCharacter(character)\n    if player then\n        player:SetAttribute("Checkpoint", checkpoint.Name)\n    end\nend)\n\n-- Em um sistema completo, conecte o atributo ao respawn\n-- e valide os checkpoints existentes no servidor.`
  },
  {
    id: "porta-com-proximidade", title: "Porta com ProximityPrompt", category: "Mundo", icon: "DR",
    level: "Intermediário", place: "Script dentro de uma Part", featured: false,
    description: "Abre uma porta quando o jogador usa um ProximityPrompt. Crie o prompt dentro da peça.",
    tags: ["porta", "proximityprompt", "interação", "mundo"],
    code: `local door = script.Parent\nlocal prompt = door:WaitForChild("ProximityPrompt")\nlocal isOpen = false\n\nprompt.Triggered:Connect(function(player)\n    isOpen = not isOpen\n    door.Transparency = isOpen and 0.65 or 0\n    door.CanCollide = not isOpen\n    prompt.ActionText = isOpen and "Fechar" or "Abrir"\nend)`
  },
  {
    id: "ciclo-dia-noite", title: "Ciclo de dia e noite", category: "Mundo", icon: "☼",
    level: "Iniciante", place: "ServerScriptService", featured: false,
    description: "Avança o relógio do Lighting para criar um ciclo contínuo de dia e noite.",
    tags: ["lighting", "dia", "noite", "tempo", "ambiente"],
    code: `local Lighting = game:GetService("Lighting")\nlocal SECONDS_PER_GAME_HOUR = 30\n\nwhile true do\n    Lighting.ClockTime = (Lighting.ClockTime + 1) % 24\n    task.wait(SECONDS_PER_GAME_HOUR)\nend`
  },
  {
    id: "gerador-partes", title: "Gerar peças de teste", category: "Mundo", icon: "3D",
    level: "Iniciante", place: "ServerScriptService", featured: false,
    description: "Cria uma fileira de blocos coloridos no Workspace para testar construções.",
    tags: ["instance", "part", "workspace", "gerar", "construção"],
    code: `local Workspace = game:GetService("Workspace")\n\nfor i = 1, 6 do\n    local part = Instance.new("Part")\n    part.Name = "BlocoDeTeste"\n    part.Size = Vector3.new(4, 1, 4)\n    part.Position = Vector3.new(i * 5, 5, 0)\n    part.Anchored = true\n    part.Color = Color3.fromHSV(i / 6, 0.7, 1)\n    part.Parent = Workspace\nend`
  },
  {
    id: "debounce-toque", title: "Debounce para eventos", category: "Utilitários", icon: "DB",
    level: "Intermediário", place: "Script dentro de uma Part", featured: false,
    description: "Evita que um evento Touched seja processado repetidamente em sequência.",
    tags: ["debounce", "touched", "evento", "cooldown"],
    code: `local part = script.Parent\nlocal busy = false\n\npart.Touched:Connect(function(hit)\n    if busy then return end\n    busy = true\n\n    print("Toque detectado por:", hit.Name)\n    task.wait(1)\n    busy = false\nend)`
  },
  {
    id: "formatar-numero", title: "Formatar número para UI", category: "Utilitários", icon: "123",
    level: "Iniciante", place: "ModuleScript", featured: false,
    description: "Função reutilizável para exibir números inteiros com separadores de milhar.",
    tags: ["número", "formatar", "module", "moedas", "ui"],
    code: `local NumberFormat = {}\n\nfunction NumberFormat.withCommas(value)\n    local number = math.floor(tonumber(value) or 0)\n    local formatted = tostring(number)\n    while true do\n        local result, count = formatted:gsub("^(-?%d+)(%d%d%d)", "%1.%2")\n        formatted = result\n        if count == 0 then break end\n    end\n    return formatted\nend\n\nreturn NumberFormat`
  }
];
