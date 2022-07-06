import Page from './page';

class AllratesPage extends Page {
    get getRatesTable() {
        return $("//div[@class ='rates-table']")
    }   

    get sideMenu() {
        return $("aside")
    }
}

export default new AllratesPage();
