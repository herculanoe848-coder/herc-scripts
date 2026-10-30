/* Recursos didáticos para criar mecânicas próprias no Roblox Studio.
   Não são cheats, executores ou hubs para interferir em experiências de terceiros. */
window.HERC_SCRIPTS = [
{ id:"brainrot-colecionar", title:"Colecionar personagem", category:"Steal a Brainrot", icon:"SB", level:"Intermediário", place:"Script dentro de uma Part", featured:true, description:"Base de coleta para um item colecionável no seu próprio jogo.", tags:["brainrot","coletar","item","steal a brainrot"], source:"https://create.roblox.com/docs/scripting/events/remote", code:`local Players = game:GetService("Players")
local item = script.Parent
local busy = false

item.Touched:Connect(function(hit)
    if busy then return end
    local player = Players:GetPlayerFromCharacter(hit.Parent)
    if not player then return end
    busy = true
    local stats = player:FindFirstChild("leaderstats")
    local coins = stats and stats:FindFirstChild("Moedas")
    if coins then coins.Value += 1 end
    item:Destroy()
end)` },
{ id:"brookhaven-porta", title:"Porta interativa", category:"Brookhaven RP", icon:"BR", level:"Iniciante", place:"Script dentro de uma Part", featured:true, description:"Porta que abre e fecha com ProximityPrompt em uma experiência sua.", tags:["brookhaven","porta","casa","roleplay"], source:"https://create.roblox.com/docs/reference/engine/classes/ProximityPrompt", code:`local door = script.Parent
local prompt = door:WaitForChild("ProximityPrompt")
local open = false

prompt.Triggered:Connect(function(player)
    open = not open
    door.CanCollide = not open
    door.Transparency = open and 0.65 or 0
    prompt.ActionText = open and "Fechar" or "Abrir"
end)` },
{ id:"mm2-round", title:"Sistema de rodada", category:"Murder Mystery 2", icon:"MM", level:"Intermediário", place:"ServerScriptService", featured:true, description:"Estrutura simples de contagem e início de rodada para seu jogo de mistério.", tags:["murder mystery 2","rodada","round","timer"], source:"https://create.roblox.com/docs/scripting", code:`local Players = game:GetService("Players")
local INTERMISSION = 15
local ROUND_TIME = 120

while true do
    for t = INTERMISSION, 1, -1 do
        print("Próxima rodada em", t)
        task.wait(1)
    end
    if #Players:GetPlayers() >= 2 then
        print("Rodada iniciada!")
        task.wait(ROUND_TIME)
        print("Rodada encerrada!")
    else
        print("Aguardando mais jogadores...")
        task.wait(3)
    end
end` },
{ id:"blox-fruits-level", title:"Sistema de níveis e XP", category:"Blox Fruits", icon:"BF", level:"Intermediário", place:"ServerScriptService", featured:true, description:"Exemplo de progressão de nível e experiência para um RPG próprio.", tags:["blox fruits","xp","level","rpg"], source:"https://create.roblox.com/docs/scripting", code:`local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    local stats = Instance.new("Folder")
    stats.Name = "leaderstats"
    stats.Parent = player

    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = 1
    level.Parent = stats

    local xp = Instance.new("IntValue")
    xp.Name = "XP"
    xp.Value = 0
    xp.Parent = stats
end)` },
{ id:"rivals-target", title:"Alvo de treino", category:"RIVALS", icon:"RV", level:"Iniciante", place:"Script dentro de uma Part", featured:false, description:"Alvo de treino que registra toques no seu próprio campo de prática.", tags:["rivals","treino","target","fps"], source:"https://create.roblox.com/docs/workspace", code:`local target = script.Parent
local hits = 0

target.Touched:Connect(function(hit)
    local character = hit:FindFirstAncestorOfClass("Model")
    local humanoid = character and character:FindFirstChildOfClass("Humanoid")
    if humanoid then
        hits += 1
        print("Acertos no alvo:", hits)
    end
end)` },
{ id:"99nights-ciclo", title:"Ciclo de noite e perigo", category:"99 Nights in the Forest", icon:"99", level:"Intermediário", place:"ServerScriptService", featured:false, description:"Alterna um estado de dia/noite para criar atmosfera de sobrevivência.", tags:["99 nights","forest","noite","sobrevivência"], source:"https://create.roblox.com/docs/reference/engine/classes/Lighting", code:`local Lighting = game:GetService("Lighting")
local dayLength = 90
local nightLength = 75

while true do
    Lighting.ClockTime = 14
    print("Dia: explore e reúna recursos")
    task.wait(dayLength)

    Lighting.ClockTime = 0
    print("Noite: fique em segurança")
    task.wait(nightLength)
end` },
{ id:"adopt-pet-follow", title:"Pet que segue o jogador", category:"Adopt Me!", icon:"AM", level:"Avançado", place:"Script dentro do modelo do pet", featured:false, description:"Exemplo básico de pet seguindo o personagem em uma experiência própria.", tags:["adopt me","pet","follow","companheiro"], source:"https://create.roblox.com/docs/reference/engine/classes/Model", code:`local pet = script.Parent
local Players = game:GetService("Players")
local root = pet.PrimaryPart

while task.wait(0.2) do
    if not root then break end
    local closest, distance = nil, math.huge
    for _, player in Players:GetPlayers() do
        local character = player.Character
        local target = character and character:FindFirstChild("HumanoidRootPart")
        if target then
            local d = (target.Position - root.Position).Magnitude
            if d < distance then closest, distance = target, d end
        end
    end
    if closest then
        root.CFrame = root.CFrame:Lerp(closest.CFrame * CFrame.new(3, 0, 3), 0.15)
    end
end` },
{ id:"tsb-dummy", title:"Boneco de treino", category:"The Strongest Battlegrounds", icon:"TS", level:"Intermediário", place:"Workspace / modelo Dummy", featured:false, description:"Configura um boneco de treino para testar animações e combate no seu jogo.", tags:["strongest battlegrounds","dummy","treino","combate"], source:"https://create.roblox.com/docs/animation", code:`local dummy = workspace:WaitForChild("TrainingDummy")
local humanoid = dummy:WaitForChild("Humanoid")

humanoid.MaxHealth = 500
humanoid.Health = humanoid.MaxHealth
humanoid.DisplayName = "Boneco de Treino"

humanoid.HealthChanged:Connect(function(health)
    if health <= 0 then
        task.wait(3)
        humanoid.Health = humanoid.MaxHealth
    end
end)` },
{ id:"fisch-pesca", title:"Interação de pesca", category:"Fisch", icon:"FI", level:"Intermediário", place:"Script dentro de uma Part", featured:false, description:"Ponto de pesca com ProximityPrompt e recompensa de exemplo.", tags:["fisch","pesca","fish","recompensa"], source:"https://create.roblox.com/docs/reference/engine/classes/ProximityPrompt", code:`local spot = script.Parent
local prompt = spot:WaitForChild("ProximityPrompt")
local cooldown = {}

prompt.Triggered:Connect(function(player)
    if cooldown[player] then return end
    cooldown[player] = true
    print(player.Name .. " pescou um peixe!")
    task.wait(4)
    cooldown[player] = nil
end)` },
{ id:"pet99-eggs", title:"Recompensa aleatória", category:"Pet Simulator 99", icon:"P99", level:"Iniciante", place:"ServerScriptService", featured:false, description:"Sorteia uma recompensa de uma lista para um sistema de ovos no seu jogo.", tags:["pet simulator 99","egg","pet","random"], source:"https://create.roblox.com/docs/reference/engine/libraries/math", code:`local rewards = {
    {name = "Pet Comum", chance = 70},
    {name = "Pet Raro", chance = 25},
    {name = "Pet Lendário", chance = 5}
}

local function rollReward()
    local roll = math.random(1, 100)
    local total = 0
    for _, reward in ipairs(rewards) do
        total += reward.chance
        if roll <= total then return reward.name end
    end
    return rewards[1].name
end

print("Recompensa:", rollReward())` }
];