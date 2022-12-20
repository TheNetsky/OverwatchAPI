import axios from 'axios'

export function validateUserTag(tag: string): string | null {
    if (!tag.includes('-')) {
        return null
    } else {
        const splitTag = tag.split('-')
        if (isNaN(Number(splitTag[1].replace('/', '')))) return null // Last part should be the bTag number

        return tag
    }
}


export async function getData(tag: string) {
    // https://overwatch.blizzard.com/en-us/career/Netsky-21789/

    try {
        const request = {
            url: `https://overwatch.blizzard.com/en-us/career/${tag}`,
            method: 'GET',
        }

        const response = await axios(request)
        return response

    } catch (error: any) {

        switch (error?.response?.status) {
            case 404:
                return { errorCode: 404, message: 'Profile not found!' }

            default:
                console.log(error)
                return { errorCode: 400, message: 'An error occurred!' }

        }
    }
}