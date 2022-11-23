export default class RestService {
    constructor() {
        this._apiBase = `http://contest.elecard.ru/`
    }

    getData = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error('Counld not fetch $(url)');
        }

        return await res.json();
    }

    getCards = async () => await this.getData(`frontend_data/catalog.json`);
}