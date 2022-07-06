import page from "@pages/page"
import mainPage from "@pages/main.page"
import allRatesPage from "@pages/allRates.page"
import tablePage from "@pages/common elements/table.page"
import menuPage from "@pages/common elements/menu.page"
import { languages, currencyAbbreviation, rowsAbbreviation } from "@fixture/fixture"
import { waitAllAsync } from "@fixture/common_functions"

describe("Check languages swap", async function() {
    languages.map(lang => {
        it.skip(`Change language to ${lang}`, async function() {

            const header = await mainPage.getHeader
            await header.waitForDisplayed({timeout:5000, timeoutMsg:"header isn't displayed"})

            const currentLang = await mainPage.currentLanguage.call(header)
            await currentLang.waitForDisplayed({timeout:5000, timeoutMsg:"currentLang isn't displayed"})
            await currentLang.moveTo()

            const nextLang = await mainPage.changeLanguage.call(currentLang, lang)
            await nextLang.waitForClickable({timeout:5000, timeoutMsg:"nextLang isn't clickable"})
            await nextLang.click()

            const newLang = await mainPage.getLanguageInfo.call(header)
            await newLang.waitForDisplayed({timeout:5000, timeoutMsg:"newLang isn't displayed"})

            const newLangText = await newLang.getText()
            expectChai(newLangText, "Language differs").to.be.equal(lang)                   
        })
    })
})

describe("Check exchange-rates functionality", async () => {
    languages.map(lang => {
        it.skip(`allRates button is clickable in ${lang}`, async () => {
            await mainPage.open(lang.toLowerCase())

            const allRatesButton = await mainPage.allExRatesButton
            await allRatesButton.waitForClickable({timeout:5000, timeoutMsg:"allRatesButton isn't clickable"})
            const ref = await allRatesButton.getAttribute("href")
            await allRatesButton.click()

            const url = await allRatesPage.getUrl
            expectChai(url, "It's not the needed url").to.include(ref)
        })
    })

    languages.map(lang => {
        it.skip(`All rates table is displayed correctly in ${lang}`, async () => {
            await mainPage.open(lang.toLowerCase() + "/private/exchange-rates/")

            const allRatesTable = await allRatesPage.getRatesTable
            await allRatesTable.waitForDisplayed({timeout:5000, timeoutMsg:"allRatesTable isn't displayed"})

            const tableBody = await tablePage.getTableBody.call(allRatesTable)
            const tableHeader = await tablePage.getTableHeader.call(allRatesTable)

            const headerColumnsName = await tablePage.getHeaderColumnsName.call(tableHeader)
            const headerColumnsNameTexts = await waitAllAsync(headerColumnsName, async (webEl) => {
                let text = await webEl.getText()
                return text
            })

            const bodyRowsName = await tablePage.getBodyRowsName.call(tableBody)
            const bodyRowsNameTexts = await waitAllAsync(bodyRowsName, async (webEl) => {
                let text = await webEl.getText()
                return text
            })

            expectChai(headerColumnsNameTexts, "Not all currency is displayed").to.include.members(currencyAbbreviation)
            expectChai(bodyRowsNameTexts, "Next rows are missing").to.include.members(rowsAbbreviation[lang])
        })
    })

    languages.map(lang => {
        it(`Sidemenu's links are clickable in ${lang}`, async () => {
            await mainPage.open(lang.toLowerCase() + "/private/exchange-rates/")

            const sideMenu = await allRatesPage.sideMenu
            await sideMenu.waitForDisplayed({timeout:5000, timeoutMsg:"sideMenu isn't displayed"})

            const sideMenuOptions = await menuPage.sideMenuOptions.call(sideMenu)

            for (const webEl of sideMenuOptions) {
                const webElA = await menuPage.getAhref.call(webEl)
                const ref = await webElA.getAttribute("href")
                await webElA.scrollIntoView()
                await webElA.click()
                
                const url = await browser.getUrl()
                expectChai(url, "It's not the needed url").to.include(ref)
                await mainPage.open(lang.toLowerCase() + "/private/exchange-rates/")
            }
        })
    })
})
    
