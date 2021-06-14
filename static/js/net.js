let wait
let nick
class Net {
  constructor() {
    this.ajax(this)
    this.usuwanie()
    this.player
    this.stan
    this.ruch = "true"
    this.newPlayer
    this.spraw
    this.ponownie()

  }
  ajax(e) {
    let that = this
    $("#zaloguj").on("click", function () {
      nick = $("#login").val()
      $.ajax({
        url: "/",
        data: { nick: nick, action: "dodaj" },
        type: "POST",
        success: function (data) {
          that.player = data
          switch (data) {
            case "player 1":
              $("#form").css("display", "none")
              $("#player").text(data + ": " + nick)
              $("#reset2").css("visibility", "visible")
              wait = setInterval(function () {
                e.check()
              }, 1000)
              net.spraw = setInterval(function () { e.sprawdzanie() }, 300);
              //console.log(wait)
              break;
            case "player 2":
              net.ruch = "false"
              net.spraw = setInterval(function () { e.sprawdzanie() }, 300);
              $("#form").css("display", "none")
              $("#player").text(data + ": " + nick)
              $("#reset2").css("visibility", "visible")
              break;
            case "brak miejsc":
              $("#form").css("display", "none")
              $("#player").text(data)
              $("#reset2").css("visibility", "visible")
              break;
            default:

          }
        },
        error: function (xhr, status, error) {
          console.log(xhr);
        },
      });
    })
  }

  usuwanie() {
    $("#reset").on("click", function () {
      console.log(this)
      $.ajax({
        url: "/",
        data: { action: "usun" },
        type: "POST",
        success: function (data) {
          console.log(data)
          if (data == "jest ok") {
            location.reload()
          }
        },
        error: function (xhr, status, error) {
          console.log(xhr);
        },
      })
    })
  }

  check() {
    $.ajax({
      url: "/",
      data: { action: "check" },
      type: "POST",
      success: function (data) {
        if (data == "true") {
          net.stan = data
          $("#player").html("player 1: " + nick + "<br> gracz 2 dołączył")
          clearInterval(wait)
        }

      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }

  porownywanie() {
    $.ajax({
      url: "/",
      data: { action: "przesylanie", ruch: net.newPlayer, data: JSON.stringify(gra.tablica) },
      type: "POST",
      success: function (data) {
        console.log("zmiana")
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }

  sprawdzanie() {
    $.ajax({
      url: "/",
      data: { action: "sprawdzanie", data: JSON.stringify(gra.tablica) },
      type: "POST",
      success: function (data) {
        let object = JSON.parse(data)
        if (net.player == "player 1") {
          net.ruch = object.player1
        }
        else if (net.player == "player 2") {
          net.ruch = object.player2
        }
        if (object.change == "true") {
          gra.tablica = object.tablica
          gra.pionki()
        }
        if (object.winner != "") {
          gra.end = "true"
          if (net.player == object.winner) {
            if (object.winner == "player 1") {
              setTimeout(function () { alert("wygrałeś " + object.users[0]), net.pobieranie(); }, 500);
            }
            else {
              setTimeout(function () { alert("wygrałeś " + object.users[1]), net.pobieranie(); }, 500);
            }
            object.liczenie = 0
            clearInterval(net.spraw)
          }
          else {
            if (object.winner == "player 1") {
              setTimeout(function () { alert("przegrałeś " + object.users[1]), net.pobieranie(); }, 500);
            }
            else {
              setTimeout(function () { alert("przegrałeś " + object.users[0]), net.pobieranie(); }, 500);
            }
            object.liczenie = 0
            clearInterval(net.spraw)
          }
        } else if (object.liczenie == 36 && object.winner == "") {
          console.log("licz: " + object.liczenie)
          gra.end = "true"
          clearInterval(net.spraw)
          setTimeout(function () { alert("remis "), net.pobieranie() }, 300)
          console.log(object.tablica)
          object.liczenie = 0
          //console.log("licz2: " + object.liczenie)
          object.tablica = [[0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0]]
          console.log(object.tablica, object.liczenie)
        }
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }

  baza() {
    $.ajax({
      url: "/",
      data: { action: "baza", data: net.player },
      type: "POST",
      success: function (data) {
        let object = data
        console.log("?", object)
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }

  pobieranie() {
    $.ajax({
      url: "/",
      data: { action: "pobieranie" },
      type: "POST",
      success: function (data) {
        let object = JSON.parse(data)
        gra.wyswietlanie(object)
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }

  ponownie() {
    $("#zagraj").on("click", function () {
      gra.end = "false"
      gra.tablica = [[0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]]
      gra.pionki()
      $("#root3").css("display", "none")
      $.ajax({
        url: "/",
        data: { action: "ponownie" },
        type: "POST",
        success: function (data) {
          net.spraw = setInterval(function () { net.sprawdzanie() }, 300);
        },
        error: function (xhr, status, error) {
          console.log(xhr);
        },
      })
    })
  }
}
