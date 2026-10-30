/*
  CATÁLOGO DO HERC_SCRIPTS
  Para adicionar um item, copie um objeto abaixo e altere os campos.
  Publique somente código próprio, autorizado e seguro para Roblox Studio.
*/
window.HERC_SCRIPTS = [
  {
    id: "leaderstats-basico",
    title: "Leaderstats básico",
    category: "Fundamentos",
    game: "Qualquer experiência própria",
    description: "Cria uma pasta leaderstats com uma estatística de moedas para cada jogador.",
    featured: true,
    code: `-- Script de servidor: coloque em ServerScriptService
game:GetService("Players").PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = 0
    coins.Parent = leaderstats
end)`
  },
  {
    id: "peca-que-da-moedas",
    title: "Peça que dá moedas",
    category: "Mecânicas",
    game: "Qualquer experiência própria",
    description: "Exemplo de coleta simples: ao tocar na peça, o jogador recebe moedas uma vez.",
    featured: true,
    code: `-- Script de servidor: coloque dentro de uma Part no Workspace
local part = script.Parent
local reward = 5
local collected = {}

part.Touched:Connect(function(hit)
    local character = hit:FindFirstAncestorOfClass("Model")
    local player = character and game:GetService("Players"):GetPlayerFromCharacter(character)
    if not player or collected[player.UserId] then return end

    local stats = player:FindFirstChild("leaderstats")
    local coins = stats and stats:FindFirstChild("Coins")
    if not coins then return end

    collected[player.UserId] = true
    coins.Value += reward
    part.Transparency = 1
    part.CanTouch = false
    part.CanCollide = false
end)`
  },
  {
    id: "plataforma-movel",
    title: "Plataforma móvel",
    category: "Mecânicas",
    game: "Obby / plataforma própria",
    description: "Move uma plataforma entre dois pontos usando TweenService.",
    featured: true,
    code: `-- Script de servidor: coloque dentro de uma Part ancorada
local TweenService = game:GetService("TweenService")
local platform = script.Parent
local startPosition = platform.Position
local endPosition = startPosition + Vector3.new(0, 0, 24)
local info = TweenInfo.new(3, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)

while true do
    local outward = TweenService:Create(platform, info, {Position = endPosition})
    outward:Play()
    outward.Completed:Wait()

    local back = TweenService:Create(platform, info, {Position = startPosition})
    back:Play()
    back.Completed:Wait()
end`
  },
  {
    id: "porta-com-proximityprompt",
    title: "Porta com interação",
    category: "Interação",
    game: "Qualquer experiência própria",
    description: "Abre uma porta quando o jogador usa um ProximityPrompt.",
    featured: false,
    code: `-- Coloque este Script dentro da Part da porta.
-- Adicione um ProximityPrompt como filho da Part.
local door = script.Parent
local prompt = door:WaitForChild("ProximityPrompt")
local isOpen = false
local closedCFrame = door.CFrame
local openCFrame = closedCFrame * CFrame.new(0, door.Size.Y, 0)

prompt.ActionText = "Abrir"
prompt.ObjectText = "Porta"

prompt.Triggered:Connect(function(player)
    isOpen = not isOpen
    door.CFrame = isOpen and openCFrame or closedCFrame
    prompt.ActionText = isOpen and "Fechar" or "Abrir"
end)`
  },
  {
    id: "velocidade-configuravel",
    title: "Velocidade configurável",
    category: "Personagem",
    game: "Experiência própria",
    description: "Exemplo de configuração de velocidade no servidor para testar mecânicas do seu jogo.",
    featured: false,
    code: `-- Script de servidor em ServerScriptService
local Players = game:GetService("Players")
local DEFAULT_SPEED = 16
local TEST_SPEED = 22

Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")
        humanoid.WalkSpeed = DEFAULT_SPEED

        -- Ajuste TEST_SPEED para testar a mecânica
        -- em sua própria experiência.
        if player:GetAttribute("UseTestSpeed") == true then
            humanoid.WalkSpeed = TEST_SPEED
        end
    end)
end)`
  },
  {
    id: "botao-ui",
    title: "Botão de interface",
    category: "Interface",
    game: "Qualquer experiência própria",
    description: "LocalScript de exemplo para responder ao clique em um botão da interface.",
    featured: false,
    code: `-- LocalScript dentro de um TextButton no StarterGui
local button = script.Parent
local originalText = button.Text

button.Activated:Connect(function()
    button.Text = "Selecionado!"
    button.AutoButtonColor = false

    task.wait(1.2)

    button.Text = originalText
    button.AutoButtonColor = true
end)`
  }
];
