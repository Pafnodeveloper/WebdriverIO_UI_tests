export default class Page {
    
    async open(path = 'ru') {
        await browser.url(`https://infinbank.com/${path}`)
    }

    get getUrl() {
        return browser.getUrl()
    }

    get getHeader() {
        return $("//header")
    }

    get getFooter() {
        return $("//footer")
    }

    async currentLanguage() {
        return this.$("//div[@class ='header__select']")
    }

    async getLanguageInfo() {
        return this.$("./descendant::div[@class = 'header__select__item']")
    }

    async changeLanguage(language) {
        return this.$(`./descendant::span[text() = '${language}']`)
    }
}
