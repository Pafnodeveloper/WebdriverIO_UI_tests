import Page from './page';

class MainPage extends Page {
    get allExRatesButton() {
        return $("//a[@class = 'btn secondary filter-link']")
    }    
}

export default new MainPage();
