export default class RestService {
    constructor() {
        this._apiBase = `http://contest.elecard.ru/`
    }

    getData = async (url) => {
        let  res = {};
        try {
            res = await fetch(`${this._apiBase}${url}`);
        } catch {}
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase + url}`);
        }

        return await res.json();
    }

    getCards = async () => await this.getData(`frontend_data/catalog.json`);
}