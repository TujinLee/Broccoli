interface RequestOption {
    url: string
    method?: string
    data: any,
    contentType?: 'application/json' | 'application/x-www-form-urlencoded'
}

function toFormData(data: Record<string, string>) {
    const formData = new FormData()
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    return formData
}

export default function request({
    url,
    method = "POST",
    data,
    contentType = 'application/json'
}: RequestOption): Promise<any> {
    return new Promise((resolve, reject) => {
        const reqData = contentType === 'application/json' ? JSON.stringify(data) : toFormData(data)
        fetch(url, {
            method,
            headers: {
                ['Content-Type']: contentType
            },
            body: reqData
        })
            .then((response) => {
                // 注意此处
                response.json().then((data) => {
                    console.log(data, response);
                    if (response.ok && response.status === 200) {
                        resolve(data)
                    } else {
                        reject(data.errorMessage)
                    }

                }).catch((err) => {
                    console.log(err)
                    reject(err);
                })
            });
        // .then((response) => {
        //     if (response.status === 400) {
        //         return Promise.reject({
        //             text: response.statusText,
        //             es: response.json()
        //         })
        //     }
        //     return response.json()
        // })
        //     .then((result) => {
        //         resolve(result)
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //         reject(error)
        //     });
    })
}