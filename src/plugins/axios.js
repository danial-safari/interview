import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'http://stage.achareh.ir/api/karfarmas',
})

const usernamePasswordBuffer = Buffer.from('09822222222' + ':' + 'sana1234');
const base64data = usernamePasswordBuffer.toString('base64');


axiosInstance.interceptors.request.use((config)=> {

    config.headers.authorization = `Basic ${base64data}`
    return config;
},(error) =>{
    // Do something with request error
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use((response)=> {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
}, (error)=> {
    throw new handleError(error);
});

function handleError(error) {
    switch (error) {
        case error.response.status === 401 :
            this.message = 'احراز هویت شما با مشکل مواجه شده است'
            break;
        case error.response.status === 500 :
            this.message = 'سرور در دسترس نیست'
            break;
        case error.response.status === 400 :
            this.message = 'درخواست با خطا مواجه شد'
            break;
        case error.response.status === 404 :
            this.message = 'درخواست شما یافت نشد'
            break;
        case error.response.status === 503 :
            this.message = 'سرویس در دسترس نمیباشد'
            break;
        default :
            this.message = 'مشکلی وجود دارد'
            break;
    }
}

export default axiosInstance;