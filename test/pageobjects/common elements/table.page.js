class Table{
    async getTableBody() {
        return this.$("./descendant::table/tbody")
    }

    async getTableHeader() {
        return this.$("./descendant::table/thead")
    }

    async getHeaderColumnsName() {
        return this.$$("/descendant::th")
    }

    async getBodyRowsName() {
        return this.$$("./descendant::td[contains(@class, 'rates')]")
    }
}

export default new Table()