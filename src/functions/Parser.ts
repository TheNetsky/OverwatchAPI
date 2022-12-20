import { load, CheerioAPI } from 'cheerio'
import { getData } from './Data'


// Parse User Info
async function parseUser($: CheerioAPI, tag: string) {

    const name: string = $('h1.Profile-player--name').text().trim()
    const title: string | null = $('h2.Profile-player--title').text().trim() ?? null
    const icon: string | null = $('img,div.Profile-player--portrait').attr('src') ?? null

    const endorsementIcon: string | null = $('img.Profile-playerSummary--endorsement').attr('src') ?? null

    const endorsementRegex = endorsementIcon?.match(/cons\/endorsement\/(\d)/)
    const endorsementLevel: number | null = !endorsementIcon ? null : ((endorsementRegex && endorsementRegex[1]) ? Number(endorsementRegex[1]) : null)

    const isPrivate: boolean = $('div.Profile-private---msg').length > 0 ? true : false

    return {
        tag: tag.replace('-', '#'),
        name: name,
        discriminator: tag.split('-').pop(),
        title: title,
        icon: icon,
        private: isPrivate,
        endorsementLevel: endorsementLevel,
        endorsementIcon: endorsementIcon
    }
}


// Parse Hero Playtime (Time Played)
async function parsePlaytime($: CheerioAPI) {
    // 0x0860000000000021

    function formatTime(string: string): number | null {
        const stringSplit = string.split(':')

        switch (stringSplit.length) {
            case 3:
                return (Number(stringSplit[0]) * 3600 * 1000) + (Number(stringSplit[1]) * 60 * 1000) + (Number(stringSplit[2]) * 1000)
            case 2:
                return (Number(stringSplit[0]) * 60 * 1000) + (Number(stringSplit[1]) * 1000)
            case 1:
                return (Number(stringSplit[0]) * 1000)
            default: return null
        }

    }

    // Quick Play
    const qpSection = $('[data-category-id=0x0860000000000021]', 'div.Profile-heroSummary--view.quickPlay-view')

    const qpHeroData: Array<any> = []
    for (const hero of qpSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const playtime: string = $('div.Profile-progressBar-description', hero).text().trim()
        const playtimeMS: number | null = formatTime(playtime)
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null


        qpHeroData.push({
            name: name,
            playtime: playtime,
            playtimeMS: playtimeMS,
            icon: icon
        })
    }

    // Competitive Play
    const compSection = $('[data-category-id=0x0860000000000021]', 'div.Profile-heroSummary--view.competitive-view')

    const compHeroData: Array<any> = []
    for (const hero of compSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const playtime: string = $('div.Profile-progressBar-description', hero).text().trim()
        const playtimeMS: number | null = formatTime(playtime)
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null


        compHeroData.push({
            name: name,
            playtime: playtime,
            playtimeMS: playtimeMS,
            icon: icon
        })
    }

    return {
        quickplay: qpHeroData,
        competitive: compHeroData
    }
}


// Parse Games Won
async function parseGamesWon($: CheerioAPI) {
    // 0x0860000000000039

    // Quick Play
    const qpSection = $('[data-category-id=0x0860000000000039]', 'div.Profile-heroSummary--view.quickPlay-view')

    const qpHeroData: Array<any> = []
    for (const hero of qpSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const wins: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null


        qpHeroData.push({
            name: name,
            wins: wins,
            icon: icon
        })
    }


    // Competitive Play
    const compSection = $('[data-category-id=0x0860000000000039]', 'div.Profile-heroSummary--view.competitive-view')

    const compHeroData: Array<any> = []
    for (const hero of compSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const wins: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null

        compHeroData.push({
            name: name,
            wins: wins,
            icon: icon
        })
    }

    return {
        quickplay: qpHeroData,
        competitive: compHeroData
    }
}


// Parse Weapon Accuracy
async function parseWeaponAccuracy($: CheerioAPI) {
    // 0x086000000000002F

    // Quick Play
    const qpSection = $('[data-category-id=0x086000000000002F]', 'div.Profile-heroSummary--view.quickPlay-view')

    const qpHeroData: Array<any> = []
    for (const hero of qpSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const accuracy: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null


        qpHeroData.push({
            name: name,
            accuracy: accuracy,
            icon: icon
        })
    }


    // Competitive Play
    const compSection = $('[data-category-id=0x086000000000002F]', 'div.Profile-heroSummary--view.competitive-view')

    const compHeroData: Array<any> = []
    for (const hero of compSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const accuracy: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null

        compHeroData.push({
            name: name,
            accuracy: accuracy,
            icon: icon
        })
    }

    return {
        quickplay: qpHeroData,
        competitive: compHeroData
    }
}


// Parse Eliminations Per Life
async function parseElimsPerLife($: CheerioAPI) {
    // 0x08600000000003D2

    // Quick Play
    const qpSection = $('[data-category-id=0x08600000000003D2]', 'div.Profile-heroSummary--view.quickPlay-view')

    const qpHeroData: Array<any> = []
    for (const hero of qpSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const elims: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null


        qpHeroData.push({
            name: name,
            elims: elims,
            icon: icon
        })
    }


    // Competitive Play
    const compSection = $('[data-category-id=0x08600000000003D2]', 'div.Profile-heroSummary--view.competitive-view')

    const compHeroData: Array<any> = []
    for (const hero of compSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const elims: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null

        compHeroData.push({
            name: name,
            elims: elims,
            icon: icon
        })
    }

    return {
        quickplay: qpHeroData,
        competitive: compHeroData
    }
}

// Parse Critical Hit Accuracy
async function parseCritHitsAccuracy($: CheerioAPI) {
    // 0x08600000000003E2

    // Quick Play
    const qpSection = $('[data-category-id=0x08600000000003E2]', 'div.Profile-heroSummary--view.quickPlay-view')

    const qpHeroData: Array<any> = []
    for (const hero of qpSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const critPerc: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null


        qpHeroData.push({
            name: name,
            critPerc: critPerc,
            icon: icon
        })
    }


    // Competitive Play
    const compSection = $('[data-category-id=0x08600000000003E2]', 'div.Profile-heroSummary--view.competitive-view')

    const compHeroData: Array<any> = []
    for (const hero of compSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const critPerc: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null

        compHeroData.push({
            name: name,
            critPerc: critPerc,
            icon: icon
        })
    }

    return {
        quickplay: qpHeroData,
        competitive: compHeroData
    }
}


// Parse Multikill Best
async function parseMultiKillBest($: CheerioAPI) {
    // 0x0860000000000346

    // Quick Play
    const qpSection = $('[data-category-id=0x0860000000000346]', 'div.Profile-heroSummary--view.quickPlay-view')

    const qpHeroData: Array<any> = []
    for (const hero of qpSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const bestMulti: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null


        qpHeroData.push({
            name: name,
            bestMulti: bestMulti,
            icon: icon
        })
    }


    // Competitive Play
    const compSection = $('[data-category-id=0x0860000000000346]', 'div.Profile-heroSummary--view.competitive-view')

    const compHeroData: Array<any> = []
    for (const hero of compSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const bestMulti: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null

        compHeroData.push({
            name: name,
            bestMulti: bestMulti,
            icon: icon
        })
    }

    return {
        quickplay: qpHeroData,
        competitive: compHeroData
    }
}


// Parse Object Kills
async function parseObjectiveKills($: CheerioAPI) {
    // 0x086000000000031C

    // Quick Play
    const qpSection = $('[data-category-id=0x086000000000031C]', 'div.Profile-heroSummary--view.quickPlay-view')

    const qpHeroData: Array<any> = []
    for (const hero of qpSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const objectiveKills: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null


        qpHeroData.push({
            name: name,
            objectiveKills: objectiveKills,
            icon: icon
        })
    }


    // Competitive Play
    const compSection = $('[data-category-id=0x086000000000031C]', 'div.Profile-heroSummary--view.competitive-view')

    const compHeroData: Array<any> = []
    for (const hero of compSection.children().toArray()) {
        const name: string = $('div.Profile-progressBar-title', hero).text().trim()
        const objectiveKills: string = $('div.Profile-progressBar-description', hero).text().trim()
        const icon: string | null = $('img,div.Profile-progressBar--icon', hero).attr('src') ?? null

        compHeroData.push({
            name: name,
            objectiveKills: objectiveKills,
            icon: icon
        })
    }

    return {
        quickplay: qpHeroData,
        competitive: compHeroData
    }
}


// Parse Hero Stats
async function parseHeroStats($: CheerioAPI) {

    function getHero(heroList: any, option: string) {
        const item = option.split(' ').pop()?.replace('option-', '')

        //@ts-ignore
        const match = heroList.find(x => x.attribs.value == item)
        return match.attribs['option-id']
    }

    // Quick Play
    const qpSection = $('blz-section.stats.quickPlay-view')

    const qpHeroList = $('select.Profile-dropdown', qpSection).children('option').toArray()

    const qpHeroStatsArray: Array<any> = []
    // For each hero
    for (const container of qpSection.children('span.stats-container').toArray()) {
        const hero = getHero(qpHeroList, container.attribs.class) // Get hero from class option

        const categoryArray: Array<any> = []
        // Type of stat (category)
        for (const category of container.children) {
            const header = $('div.header', category).text().trim()

            const itemsArray: Array<any> = []
            // Stat items in category
            for (const statItem of $('div.stat-item', category)) {
                const stat: string = $('p.name', statItem).text().trim()
                const value: string = $('p.value', statItem).text().trim()

                itemsArray.push({
                    stat: stat,
                    value: value
                })
            }

            categoryArray.push({
                category: header,
                items: itemsArray
            })
        }

        qpHeroStatsArray.push({
            hero: hero,
            categories: categoryArray
        })
    }


    // Competitive Play
    const compSection = $('blz-section.stats.competitive-view')

    const compHeroList = $('select.Profile-dropdown', compSection).children('option').toArray()

    const compHeroStatsArray: Array<any> = []
    // For each hero
    for (const container of compSection.children('span.stats-container').toArray()) {
        const hero = getHero(compHeroList, container.attribs.class) // Get hero from class option

        const categoryArray: Array<any> = []
        // Type of stat (category)
        for (const category of container.children) {
            const header = $('div.header', category).text().trim()

            const itemsArray: Array<any> = []
            // Stat items in category
            for (const statItem of $('div.stat-item', category)) {
                const stat: string = $('p.name', statItem).text().trim()
                const value: string = $('p.value', statItem).text().trim()

                itemsArray.push({
                    stat: stat,
                    value: value
                })
            }

            categoryArray.push({
                category: header,
                items: itemsArray
            })
        }

        compHeroStatsArray.push({
            hero: hero,
            categories: categoryArray
        })
    }

    return {
        quickplay: qpHeroStatsArray,
        competitive: compHeroStatsArray,
    }

}


export async function playerData(tag: string) {
    const data: any = await getData(tag)
    if (data.errorCode) return data

    const $ = load(data.data)


    return {
        user: await parseUser($, tag),
        playtime: await parsePlaytime($),
        heroStats: await parseHeroStats($),
        gamesWon: await parseGamesWon($),
        weaponAccuracy: await parseWeaponAccuracy($),
        elimsPerLife: await parseElimsPerLife($),
        critHitAccuracy: await parseCritHitsAccuracy($),
        bestMultiKill: await parseMultiKillBest($),
        objectiveKills: await parseObjectiveKills($)
    }
}