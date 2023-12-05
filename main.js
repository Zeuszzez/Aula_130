PunhoDireitoX = 0
PunhoDireitoY = 0
PunhoEsquerdoX = 0
PunhoEsquerdoY = 0
som = ""
precisãoPunhoDireito = 0
precisãoPunhoEsquerdo = 0

function preload() {
    som = loadSound("music.mp3")
}
function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}
function modelLoaded() {
    console.log("modeloCarregado")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        PunhoDireitoX = results[0].pose.rightWrist.x
        PunhoDireitoY = results[0].pose.rightWrist.y
        PunhoEsquerdoX = results[0].pose.leftWrist.x
        PunhoEsquerdoX = results[0].pose.leftWrist.y
        console.log(PunhoDireitoX + " . " + PunhoDireitoY + " . " + PunhoEsquerdoX + " . " + PunhoEsquerdoY)
        precisãoPunhoDireito = results[0].pose.keypoints[10].score
        precisãoPunhoEsquerdo = results[0].pose.keypoints[9].score
        console.log(precisãoPunhoDireito + " . " + precisãoPunhoEsquerdo)

    }
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill("red")
    stroke("black")
    if (precisãoPunhoEsquerdo > 0.2) {
        circle(PunhoEsquerdoX, PunhoEsquerdoY, 20)
        numInteiro = floor(Number(PunhoEsquerdoY))
        console.log(numIntero)
        volume = numInteiro / 500
        som.setVolume(volume)
    }
    if (precisãoPunhoDireito > 0.2) {
        if (PunhoDireitoY > 0 && PunhoDireitoY <= 100) {
            document.getElementById("speed").innerHTML = "Velocidade = 0.5x"
            som.rate(0.5)
        }
        else if (PunhoDireitoY > 100 && PunhoDireitoY <= 200) {
            document.getElementById("speed").innerHtml = "Velocidade = 1x"
            som.rate(1)
        }
        else if (PunhoDireitoY > 200 && PunhoDireitoY <= 300) {
            document.getElementById("speed").innerHtml = "Velocidade = 1.5x"
            som.rate(1.5)

        }
        else if (PunhoDireitoY > 300 && PunhoDireitoY <= 400) {
            document.getElementById("speed").innerHtml = "Velocidade = 2x"
            som.rate(2)
        }
        else if (PunhoDireitoY > 400) {
            document.getElementById("speed").innerHtml = "Velocidade = 2.5x"
            som.rate(2.5)
        }
    }
}

function Play() {
    console.log("Função Play Ok")
    som.play()
    som.setVolume(1)
    som.rate(1)
}

function Stop() {
    som.stop()
}