// describe('Demo API Test', () => {
//     const baseURL = "https://api.trello.com";
//     const apiKey = "86088e89e9c5294444fd3f0d4d91d89c";
//     const apiToken = "ATTAf6648b22eb9193026d8fee3248f539d981bece4ec7634a2af5dc338ba14fe9b502BDE356";
//     const boardName1='On Board';
//     let id;
//     it('creating new trello board', () => {
//         cy.request({
//             method:"POST",
//             url:baseURL+"/1/boards",
//             qs:{
//                 name:"My first board",
//                 key:apiKey,
//                 token: apiToken,
//             }
//         }).then((response)=>{
//             const res= JSON.parse(JSON.stringify(response.body))
//             id=res.id
//             expect(response.status).to.eql(200)
        
//         })
//     });
//     it('retriveing trello board', () => {
//         cy.request({
//             method:"GET",
//             url:baseURL+"/1/boards/"+id,
//             qs:{
//                 key:apiKey,
//                 token: apiToken,
//             }
//         }).then((response)=>{
//             const res= JSON.parse(JSON.stringify(response.body))
//             expect(response.status).to.eql(200)
        
//         })
//     });

//     // it('updating Trello board', () => {
//     //     cy.request({
//     //         method: "PUT",
//     //         url: baseURL + "/1/boards/" + id,
//     //         qs: {
//     //             name: "Updated board name", 
//     //             key: apiKey,
//     //             token: apiToken,
//     //         }
//     //     }).then((response) => {
//     //         const res = JSON.parse(JSON.stringify(response.body));
//     //         expect(response.status).to.eql(200);
//     //         expect(res.name).to.eql("Updated board name");
//     //     });
//     // });

//     it('deleting Trello board', () => {
//         cy.request({
//             method: "DELETE",
//             url: baseURL + "/1/boards/" + id,
//             qs: {
//                 key: apiKey,
//                 token: apiToken,
//             }
//         }).then((response) => {
//             expect(response.status).to.eql(200);
//         });
//     });
// });


    
describe('Trello API CRUD Operations', () => {
    const baseURL = "https://api.trello.com";
    const apiKey = "86088e89e9c5294444fd3f0d4d91d89c";
    const apiToken = "ATTAf6648b22eb9193026d8fee3248f539d981bece4ec7634a2af5dc338ba14fe9b502BDE356";
    let boardId;
    let listId;
    let cardId;

    // -----------------------------------------
    // Board CRUD Operations
    // -----------------------------------------
    describe('Board CRUD Operations', () => {
        it('Create a new Trello board', () => {
            cy.request({
                method: "POST",
                url: `${baseURL}/1/boards`,
                qs: {
                    name: "My first board",
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                const res = response.body;
                boardId = res.id;
                expect(response.status).to.eql(200);
                cy.log(`Board created with ID: ${boardId}`);
            });
        });

        it('Retrieve the Trello board', () => {
            cy.request({
                method: "GET",
                url: `${baseURL}/1/boards/${boardId}`,
                qs: {
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                expect(response.status).to.eql(200);
                expect(response.body.id).to.eql(boardId);
                cy.log(`Retrieved board with ID: ${boardId}`);
            });
        });

        it('Update the Trello board', () => {
            cy.request({
                method: "PUT",
                url: `${baseURL}/1/boards/${boardId}`,
                qs: {
                    name: "Updated board name",
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                expect(response.status).to.eql(200);
                expect(response.body.name).to.eql("Updated board name");
                cy.log(`Updated board name to: "Updated board name"`);
            });
        });

        it('Delete the Trello board', () => {
            cy.request({
                method: "DELETE",
                url: `${baseURL}/1/boards/${boardId}`,
                qs: {
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                expect(response.status).to.eql(200);
                cy.log(`Deleted board with ID: ${boardId}`);
            });
        });
    });

    // -----------------------------------------
    // List CRUD Operations
    // -----------------------------------------
    describe('List CRUD Operations', () => {
        before(() => {
            // Create a board to hold the list
            cy.request({
                method: "POST",
                url: `${baseURL}/1/boards`,
                qs: {
                    name: "Board for Lists",
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                boardId = response.body.id;
                cy.log(`Board created for lists with ID: ${boardId}`);
            });
        });

        it('Create a new list on the board', () => {
            cy.request({
                method: "POST",
                url: `${baseURL}/1/lists`,
                qs: {
                    name: "To Do",
                    idBoard: boardId,
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                listId = response.body.id;
                expect(response.status).to.eql(200);
                cy.log(`List created with ID: ${listId}`);
            });
        });

        it('Retrieve the list', () => {
            cy.request({
                method: "GET",
                url: `${baseURL}/1/lists/${listId}`,
                qs: {
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                expect(response.status).to.eql(200);
                expect(response.body.name).to.eql("To Do");
                cy.log(`Retrieved list with ID: ${listId}`);
            });
        });

        it('Update the list name', () => {
            cy.request({
                method: "PUT",
                url: `${baseURL}/1/lists/${listId}`,
                qs: {
                    name: "In Progress",
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                expect(response.status).to.eql(200);
                expect(response.body.name).to.eql("In Progress");
                cy.log(`Updated list name to: "In Progress"`);
            });
        });

        it('Archive the list', () => {
            cy.request({
                method: "PUT",
                url: `${baseURL}/1/lists/${listId}/closed`,
                qs: {
                    value: true,
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                expect(response.status).to.eql(200);
                expect(response.body.closed).to.eql(true);
                cy.log(`Archived list with ID: ${listId}`);
            });
        });

        after(() => {
            // Delete the board
            cy.request({
                method: "DELETE",
                url: `${baseURL}/1/boards/${boardId}`,
                qs: {
                    key: apiKey,
                    token: apiToken,
                }
            });
        });
    });

    // -----------------------------------------
    // Card CRUD Operations
    // -----------------------------------------
    describe('Card CRUD Operations', () => {
        before(() => {
            // Create a board and a list
            cy.request({
                method: "POST",
                url: `${baseURL}/1/boards`,
                qs: {
                    name: "Board for Cards",
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                boardId = response.body.id;
                cy.log(`Board created for cards with ID: ${boardId}`);

                // Create a list in the board
                cy.request({
                    method: "POST",
                    url: `${baseURL}/1/lists`,
                    qs: {
                        name: "Tasks",
                        idBoard: boardId,
                        key: apiKey,
                        token: apiToken,
                    }
                }).then((response) => {
                    listId = response.body.id;
                    cy.log(`List created for cards with ID: ${listId}`);
                });
            });
        });

        it('Create a new card in the list', () => {
            cy.request({
                method: "POST",
                url: `${baseURL}/1/cards`,
                qs: {
                    name: "Task 1",
                    idList: listId,
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                cardId = response.body.id;
                expect(response.status).to.eql(200);
                cy.log(`Card created with ID: ${cardId}`);
            });
        });

        it('Retrieve the card', () => {
            cy.request({
                method: "GET",
                url: `${baseURL}/1/cards/${cardId}`,
                qs: {
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                expect(response.status).to.eql(200);
                expect(response.body.name).to.eql("Task 1");
                cy.log(`Retrieved card with ID: ${cardId}`);
            });
        });

        it('Update the card name', () => {
            cy.request({
                method: "PUT",
                url: `${baseURL}/1/cards/${cardId}`,
                qs: {
                    name: "Updated Task 1",
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                expect(response.status).to.eql(200);
                expect(response.body.name).to.eql("Updated Task 1");
                cy.log(`Updated card name to: "Updated Task 1"`);
            });
        });

        it('Delete the card', () => {
            cy.request({
                method: "DELETE",
                url: `${baseURL}/1/cards/${cardId}`,
                qs: {
                    key: apiKey,
                    token: apiToken,
                }
            }).then((response) => {
                expect(response.status).to.eql(200);
                cy.log(`Deleted card with ID: ${cardId}`);
            });
        });

        after(() => {
            // Delete the board
            cy.request({
                method: "DELETE",
                url: `${baseURL}/1/boards/${boardId}`,
                qs: {
                    key: apiKey,
                    token: apiToken,
                }
            });
        });
    });
});
