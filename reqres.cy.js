describe('ReqResAPI', () => {
    const baseURL="https://reqres.in/"
    let id;
    it('POST', () => {
       cy.request({
        method:"POST",
        url:baseURL+"api/users",
        body:{
    
                "name": "Divyang",
                "job": "leader"
            
        }
       }).then((response)=>{
        const res =JSON.parse(JSON.stringify(response.body))
        id=res.id
        expect(response.status).to.eql(201)
        cy.log(id)
       }) 
    });
});
