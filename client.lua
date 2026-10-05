local lastVisible = nil

local function getVehicleForHud(ped)
  local vehicle = GetVehiclePedIsIn(ped, false)
  if vehicle == 0 then
    return nil
  end

  if Config.DriverOnly and GetPedInVehicleSeat(vehicle, -1) ~= ped then
    return nil
  end

  return vehicle
end

local function driveMode(gear, speed)
  if gear == 0 then
    return 'R'
  end

  if gear == 1 and speed < 1.0 then
    return 'N'
  end

  return 'D'
end

local function buildHudData(vehicle)
  local speedMs = GetEntitySpeed(vehicle)
  local speed = Config.UseMetric and (speedMs * 3.6) or (speedMs * 2.236936)
  local unit = Config.UseMetric and 'KM/H' or 'MPH'
  local rpm = GetVehicleCurrentRpm(vehicle)
  local gear = GetVehicleCurrentGear(vehicle)
  local fuelLevel = GetVehicleFuelLevel(vehicle)
  local engineHealth = GetVehicleEngineHealth(vehicle)
  local _, lightsOn, highBeamsOn = GetVehicleLightsState(vehicle)
  local indicatorBits = GetVehicleIndicatorLights(vehicle)
  local lockStatus = GetVehicleDoorLockStatus(vehicle)

  local fuelPercent = math.max(0, math.min(100, fuelLevel))
  local enginePercent = math.max(0, math.min(100, engineHealth / 10.0))

  return {
    speed = math.floor(speed + 0.5),
    unit = unit,
    rpm = rpm,
    redline = Config.Redline,
    gear = gear,
    drive = driveMode(gear, speed),
    transmission = 'AUTO',
    fuel = {
      percent = math.floor(fuelPercent + 0.5),
      detail = string.format('%d%%', math.floor(fuelPercent + 0.5)),
    },
    engine = {
      percent = math.floor(enginePercent + 0.5),
      detail = string.format('%d%%', math.floor(enginePercent + 0.5)),
    },
    indicators = {
      leftTurn = indicatorBits == 1 or indicatorBits == 3,
      rightTurn = indicatorBits == 2 or indicatorBits == 3,
      seatBelt = false,
      lights = lightsOn == 1 or highBeamsOn == 1,
      locked = lockStatus == 2 or lockStatus == 4,
    },
  }
end

CreateThread(function()
  while true do
    local ped = PlayerPedId()
    local vehicle = getVehicleForHud(ped)
    local inVehicle = vehicle ~= nil
    local visible = inVehicle and not IsPauseMenuActive()

    if Config.HideWhenOnFoot == false then
      visible = not IsPauseMenuActive()
    end

    if visible ~= lastVisible then
      lastVisible = visible
      SendNUIMessage({
        action = 'setVisible',
        visible = visible,
      })
    end

    if visible and vehicle then
      SendNUIMessage({
        action = 'update',
        visible = true,
        data = buildHudData(vehicle),
      })
    end

    Wait(Config.UpdateInterval or 100)
  end
end)
