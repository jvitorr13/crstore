
export default function({$axios}, inject){
  const api = $axios.create();

api.onRequest (() =>{
  const token = localStorage.getItem('crstore-api-token') // '';
  api.setHeader('authorization', `bearer ${token}`);
});
api.onResponse(Response => Response.data);

api.setBaseURL ('http://localhost:3333')

inject ('api',api)
}