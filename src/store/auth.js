import axios from "axios";

const authModule = {
    state : {
        userData : {}
    },
    mutations : {
        auth_set_data(state, data){
            state.userData = {...data};
        }
    },
    getters : {

    },
    actions : {
        //회원가입
        async sign_up ({commit}, data){
            let res;
            try {
                res = await axios.post('http://localhost:8080/signUp', {
                    id : data.id,
                    pw : data.pw,
                    name : data.name,
                    email : data.email,
                    ssn : data.ssn,
                    tel : data.tel,
                    address : data.address,
                    age : data.age,
                    sex : data.sex,
                });
            } catch (err) {
                console.log(err);
            }
            console.log(res);
            commit
        },
        async sign_in({commit}, data){
            console.log(data)
            let res;
            try{
                res = await axios.post('http://localhost:8080/signIn', {
                    id : data.id,
                    pw : data.pw
                });
            }catch(err){
                console.log(err);
            }
            if(res.data.token){
                localStorage.setItem('token', res.data.token);
                commit('auth_set_data', res.data.token); // jwt 토큰을 decode해서 값을 저장해야됨.
                location.href='#/home'
            }
        }
    }
}

export default authModule

