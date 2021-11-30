import callAPI from "../config";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function getMemberOverview() {
    const url = `${ROOT_API}/${API_VERSION}/players/dashboard`;

    return callAPI({
        url,
        method: 'get',
        token: true
    })
}

export async function getMemberTransaction(valueParams: string) {
    let params = ''
    if(valueParams === 'all') {
        params = ''
    } else {
        params = `?status=${valueParams}`
    }
    const url = `${ROOT_API}/${API_VERSION}/players/history${params}`
    
    return callAPI({
        url,
        method: 'get',
        token: true
    })
}

export async function getTransactionDetail(id: string, token: string) {

    const url = `${ROOT_API}/${API_VERSION}/players/history/${id}/detail`
    
    return callAPI({
        url,
        method: 'get',
        serverToken: token
    })
}

export async function updateProfile(data: FormData) {

    const url = `${ROOT_API}/${API_VERSION}/players/profile}`
    
    return callAPI({
        url,
        method: 'PUT',
        data,
        token: true
    })
}