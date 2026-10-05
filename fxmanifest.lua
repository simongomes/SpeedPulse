fx_version 'cerulean'
game 'gta5'

name 'SpeedPulse'
author 'Simon Gomes'
description 'Vehicle speedometer HUD with RPM, gear, fuel, and status indicators'
version '1.0.0'

lua54 'yes'

ui_page 'ui/dist/index.html'

shared_scripts {
    'config.lua',
}

client_scripts {
    'client.lua',
}

server_scripts {
    'server.lua',
}

files {
    'ui/dist/index.html',
    'ui/dist/**/*',
}
