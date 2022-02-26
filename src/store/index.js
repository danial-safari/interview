import Vue from 'vue'
import Vuex from 'vuex'
import mapAxios from "@/plugins/mapAxios";
import {toEnDigit , getDigitInStr} from "@/utils";

Vue.use(Vuex)
const getDefaultState = () => {
  return {
      data :{
        first_name : '',
        last_name : '',
        phone : '',
        tellPhone : '',
        gender : 'Female',
      },
      map :{
        token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJjNDlhNWYwYjM5OWM0MTJkN2NjY2YyM2JiM2Q4OTQ3MzkxYjlmZjJkNmJjZTkxMDA1Yjg5YzhmMGY5YjlhMjU1YzE3ZDM1NWU1YzFjZTEyIn0.eyJhdWQiOiIxNjIwNiIsImp0aSI6IjJjNDlhNWYwYjM5OWM0MTJkN2NjY2YyM2JiM2Q4OTQ3MzkxYjlmZjJkNmJjZTkxMDA1Yjg5YzhmMGY5YjlhMjU1YzE3ZDM1NWU1YzFjZTEyIiwiaWF0IjoxNjM4MzQyNTg4LCJuYmYiOjE2MzgzNDI1ODgsImV4cCI6MTY0MDg0ODE4OCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.d-2telvcndu-6UxpFKYlCNyhgSauxlFjsXwQaCtSy0rvjn-ZSQnsFtgFEZVGINNCT9Aj6yDFURWV01AtrRn8taUxASZFMXv6fV2LInCUJfu7aOoL9fHTqJ9BoTwwLzj1Ysjf5WSX6cNm0RA1tLju8tflsppuYuIhDkGd6qBzwkf1kXww_dtx9iNhQQRMoz3oJ-zMTzQtZbTvh9RgYg9tZrNKLxkmQWHEBmzXMvMifdZ8icG-VPXxl1gn-U3bssfKuBsmMK2n_iFyQtPW29WlYbJVUx_yIZGROmxPIKmO0MpyXEu6Z9AVStgVvQf14uLGNKgXL4fH3ScXa8uTDb80Bw',
        location : {
          region : '',
          address : '',
          lat: '',
          lng : ''
        }
      }
    }
}

export default new Vuex.Store({
  state : getDefaultState(),
  mutations: {
    SET_DETAIL_LOCATION(state , data){
      state.map.location.address = data.postal_address;
      state.map.location.region = data.region;
      state.map.location.lng = data.geom.coordinates[0]
      state.map.location.lat = data.geom.coordinates[1]
    },
    SET_USER_INFORMATION(state , data){
      state.data.first_name = data.first_name
      state.data.last_name = data.last_name
      state.data.phone = data.phone
      state.data.tellPhone = data.tellPhone
      state.data.gender = data.gender
    },
    CLEAR_DATA(state){

    }
  },
  actions: {
    async getDetailLocation({commit}, payload){
       const { data } = await mapAxios.get('/reverse/',{
        params :{
          lat : payload[1],
          lon : payload[0]
        }
      })
      // get region form api
      // and convert region digit to En
      // find region digit in string
      data.region = getDigitInStr(toEnDigit(data.region))
      commit('SET_DETAIL_LOCATION', data);
    },
    resetState ({state}) {
      Object.assign(state, getDefaultState())
    }
  },

})
