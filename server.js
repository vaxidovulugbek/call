const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8082 })

let clients = []

wss.on('connection', (ws) => {
    clients.push(ws)
    // ws.on('message', (data) => {
    //     const newData = JSON.parse(data.toString())
    //     newData[0].name = `client-${clients.indexOf(ws) + 1}`
    //     console.table(newData);
    //     wss.clients.forEach((client) => {
    //         client.send(JSON.stringify(newData))
    //     });
    // })

    ws.send(JSON.stringify([{ phone: "+998946469133" }]))
    ws.on('close', () => {
        clients = clients.filter((client, i) => {
            return clients.indexOf(ws) !== i
        })
    })
})
