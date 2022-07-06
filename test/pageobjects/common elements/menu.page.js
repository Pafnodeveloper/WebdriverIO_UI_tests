class Menu{   

    async sideMenuOptions() {
        return this.$$("./descendant::li")
    }
    async getAhref() {
        return this.$("./descendant::a")
    }
}

export default new Menu()