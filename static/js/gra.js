class Gra {
  constructor() {
    this.camera
    this.scene
    this.tablica = []
    console.log("gra")
    this.raycaster = new THREE.Raycaster()
    this.wektor = new THREE.Vector2()
    this.tablica = [[0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]]
    this.lewo
    this.prawo
    this.gora
    this.dol
    this.goraPrawo
    this.dolLewo
    this.goraLewo
    this.dolPrawo
    this.end = "false"
    this.init()

  }

  init() {
    var renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xbb3b3b3);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $("#root").append(renderer.domElement)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.set(150, 700, 150)
    this.camera.lookAt(150, 0, 150)
    // var axes = new THREE.AxesHelper(1000);
    // this.scene.add(axes);
    for (let z = 0; z <= 5; z++) {
      let boxes = []
      for (let x = 0; x <= 5; x++) {
        let box = new THREE.BoxGeometry(50, 50, 50)
        let material = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          map: new THREE.TextureLoader().load("/tlo.jpeg"),
          //transparent: true,
          //opacity: 1,

        });
        let cube = new THREE.Mesh(box, material)
        cube.userData = { x: x, y: z }
        this.scene.add(cube)
        cube.position.set((x * 50), 0, (z * 50))
        boxes.push(cube)
      }
      //this.tablica.push(boxes)
    }

    let scene = this.scene
    let camera = this.camera

    function render() {
      //console.log("render")
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    render();
  }


  pobierz(e) {
    let scene = this.scene
    let camera = this.camera
    let raycaster = this.raycaster
    let wektor = this.wektor
    wektor.x = (e.clientX / $(window).width()) * 2 - 1;
    wektor.y = -(e.clientY / $(window).height()) * 2 + 1;
    raycaster.setFromCamera(wektor, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      var element = intersects[0].object
      var x = element.userData.x
      // console.log(element)

      if (net.player == "player 1" && this.end == "false") {
        if (net.stan == "true") {
          if (net.ruch == "true" && this.tablica[0][x] == 0) {
            let iks = x
            let igrek
            if (this.tablica[5][x] == 0) {
              igrek = 5
              this.tablica[5][x] = 1
            } else if (this.tablica[4][x] == 0) {
              igrek = 4
              this.tablica[4][x] = 1
            } else if (this.tablica[3][x] == 0) {
              igrek = 3
              this.tablica[3][x] = 1
            } else if (this.tablica[2][x] == 0) {
              igrek = 2
              this.tablica[2][x] = 1
            } else if (this.tablica[1][x] == 0) {
              igrek = 1
              this.tablica[1][x] = 1
            } else if (this.tablica[0][x] == 0) {
              igrek = 0
              this.tablica[0][x] = 1
            }
            net.ruch = "false"
            net.newPlayer = "player 2"
            net.porownywanie()
            let liczba = this.tablica[igrek][iks]
            this.sprawdzanie(iks, igrek, liczba)
            this.pionki()
          }
        }
      } else if (net.player == "player 2" && this.end == "false") {
        if (net.ruch == "true" && this.tablica[0][x] == 0) {
          let iks = x
          let igrek

          if (this.tablica[5][x] == 0) {
            igrek = 5
            this.tablica[5][x] = 2
          } else if (this.tablica[4][x] == 0) {
            igrek = 4
            this.tablica[4][x] = 2
          } else if (this.tablica[3][x] == 0) {
            igrek = 3
            this.tablica[3][x] = 2
          } else if (this.tablica[2][x] == 0) {
            igrek = 2
            this.tablica[2][x] = 2
          } else if (this.tablica[1][x] == 0) {
            igrek = 1
            this.tablica[1][x] = 2
          } else if (this.tablica[0][x] == 0) {
            igrek = 0
            this.tablica[0][x] = 2
          }
          net.ruch = "false"
          net.newPlayer = "player 1"
          net.porownywanie()
          let liczba = this.tablica[igrek][iks]
          this.sprawdzanie(iks, igrek, liczba)
          this.pionki()
        }
      }
    }
  }

  pionki() {
    let zmienna = 0
    while (this.scene.children[zmienna]) {
      if (this.scene.children[zmienna].geometry.type == "CylinderGeometry") {
        this.scene.remove(this.scene.children[zmienna])
      } else {
        zmienna++
      }
    }
    let pionek = new THREE.CylinderGeometry(20, 20, 1, 50)
    let material1 = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/pic1.jpeg"),
    });
    let material2 = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/pic2.jpeg"),
    });
    for (let y = 0; y <= 5; y++) {
      for (let x = 0; x <= 5; x++) {
        if (this.tablica[y][x] == 1) {
          let kulka = new THREE.Mesh(pionek, material1)
          kulka.userData = { x: x, y: y }
          this.scene.add(kulka)
          kulka.position.set((x * 50), 30, (y * 50))
        } else if (this.tablica[y][x] == 2) {
          let kulka2 = new THREE.Mesh(pionek, material2)
          kulka2.userData = { x: x, y: y }
          kulka2.rotateY(1.57)
          this.scene.add(kulka2)
          kulka2.position.set((x * 50), 30, (y * 50))
        }
      }
    }
  }

  sprawdzanie(x, y, liczba) {
    // console.log(this.tablica)
    // console.log(x, y)
    // console.log(this.tablica[y][x])
    let funkcja
    let doLiczenia = 0
    this.prawo = 0
    this.lewo = 0
    if (this.tablica[y][x + 1] == liczba) {
      doLiczenia = 0
      funkcja = "prawo"
      doLiczenia++
      this.rekurencja(x + 1, y, funkcja, liczba, doLiczenia)
    }
    //console.log(this.prawo)
    if (this.tablica[y][x - 1] == liczba) {
      doLiczenia = 0
      funkcja = "lewo"
      doLiczenia++
      this.rekurencja(x - 1, y, funkcja, liczba, doLiczenia)
    }
    let lewoPrawo = this.lewo + this.prawo + 1

    this.gora = 0
    this.dol = 0
    if (y - 1 >= 0 && this.tablica[y - 1][x] == liczba) {
      doLiczenia = 0
      funkcja = "gora"
      doLiczenia++
      this.rekurencja(x, y - 1, funkcja, liczba, doLiczenia)
    }
    console.log(this.gora)
    if (y + 1 <= 5 && this.tablica[y + 1][x] == liczba) {
      doLiczenia = 0
      funkcja = "dol"
      doLiczenia++
      this.rekurencja(x, y + 1, funkcja, liczba, doLiczenia)
    }

    let goraDol = this.gora + this.dol + 1

    this.goraPrawo = 0
    this.dolLewo = 0
    if (y - 1 >= 0 && this.tablica[y - 1][x + 1] == liczba) {
      doLiczenia = 0
      funkcja = "goraPrawo"
      doLiczenia++
      this.rekurencja(x + 1, y - 1, funkcja, liczba, doLiczenia)
    }
    console.log(this.gora)
    if (y + 1 <= 5 && this.tablica[y + 1][x - 1] == liczba) {
      doLiczenia = 0
      funkcja = "dolLewo"
      doLiczenia++
      this.rekurencja(x - 1, y + 1, funkcja, liczba, doLiczenia)
    }

    let gPrawoDLewo = this.goraPrawo + this.dolLewo + 1

    this.goraLewo = 0
    this.dolPrawo = 0
    if (y - 1 >= 0 && this.tablica[y - 1][x - 1] == liczba) {
      doLiczenia = 0
      funkcja = "goraLewo"
      doLiczenia++
      this.rekurencja(x - 1, y - 1, funkcja, liczba, doLiczenia)
    }
    console.log(this.gora)
    if (y + 1 <= 5 && this.tablica[y + 1][x + 1] == liczba) {
      doLiczenia = 0
      funkcja = "dolPrawo"
      doLiczenia++
      this.rekurencja(x + 1, y + 1, funkcja, liczba, doLiczenia)
    }

    let gLewoDPrawo = this.goraLewo + this.dolPrawo + 1

    if (lewoPrawo >= 4 || goraDol >= 4 || gPrawoDLewo >= 4 || gLewoDPrawo >= 4) {
      net.baza()
    }
  }

  rekurencja(x, y, funkcja, liczba, doLiczenia) {
    if (funkcja == "prawo") {
      if (this.tablica[y][x + 1] == liczba) {
        doLiczenia++
        this.rekurencja(x + 1, y, funkcja, liczba, doLiczenia)
      } else {
        this.prawo = doLiczenia
      }
    }
    if (funkcja == "lewo") {
      if (this.tablica[y][x - 1] == liczba) {
        doLiczenia++
        this.rekurencja(x - 1, y, funkcja, liczba, doLiczenia)
      } else {
        this.lewo = doLiczenia
      }
    }

    if (funkcja == "gora") {
      console.log(y - 1)
      if (y - 1 >= 0 && this.tablica[y - 1][x] == liczba) {
        doLiczenia++
        this.rekurencja(x, y - 1, funkcja, liczba, doLiczenia)
      } else {
        this.gora = doLiczenia
      }
    }
    if (funkcja == "dol") {
      if (y + 1 <= 5 && this.tablica[y + 1][x] == liczba) {
        doLiczenia++
        this.rekurencja(x, y + 1, funkcja, liczba, doLiczenia)
      } else {
        this.dol = doLiczenia
      }
    }

    if (funkcja == "goraPrawo") {
      console.log(y - 1)
      if (y - 1 >= 0 && this.tablica[y - 1][x + 1] == liczba) {
        doLiczenia++
        this.rekurencja(x + 1, y - 1, funkcja, liczba, doLiczenia)
      } else {
        this.goraPrawo = doLiczenia
      }
    }
    if (funkcja == "dolLewo") {
      if (y + 1 <= 5 && this.tablica[y + 1][x - 1] == liczba) {
        doLiczenia++
        this.rekurencja(x - 1, y + 1, funkcja, liczba, doLiczenia)
      } else {
        this.dolLewo = doLiczenia
      }
    }

    if (funkcja == "goraLewo") {
      console.log(y - 1)
      if (y - 1 >= 0 && this.tablica[y - 1][x - 1] == liczba) {
        doLiczenia++
        this.rekurencja(x - 1, y - 1, funkcja, liczba, doLiczenia)
      } else {
        this.goraLewo = doLiczenia
      }
    }
    if (funkcja == "dolPrawo") {
      if (y + 1 <= 5 && this.tablica[y + 1][x + 1] == liczba) {
        doLiczenia++
        this.rekurencja(x + 1, y + 1, funkcja, liczba, doLiczenia)
      } else {
        this.dolPrawo = doLiczenia
      }
    }
  }

  wyswietlanie(e) {
    if ($("#tablica")) {
      $("#tablica").remove()
    }

    console.log(e)
    $("#root3").css("display", "flex")
    let table = "<table id='tablica'><tr><th> player 1: </th><th> player 2: </th><th> wygrany: </th></tr>"

    for (let d = 0; d < e.length; d++) {
      let tr = "<tr><td>" + e[d].a + "</td><td>" + e[d].b + "</td><td>" + e[d].c + "</td></tr>"
      table = table + tr
    }
    table = table + "</table>"
    $("#root3").append(table)
  }


}
