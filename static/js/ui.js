class Ui {
    constructor() {
        this.pobieranie()
    }

    pobieranie() {
        $("#root").on("click", function (e) {
            gra.pobierz(e)
        })
    }
}