import authService from './api-authorization/AuthorizeService';

export function getFamilleId(){
    authService.getUser()
    .then((user) => {
        if(user && user.sub){
            
            localStorage.setItem('currentUser', user.name);

            fetch(process.env.REACT_APP_BASE_URL + '/api/famille/byUserId/' + user.sub,
            {
                method: "get",
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then((res) =>res.json())
            .then((data) => {
                if(data.length > 0)
                {
                    localStorage.setItem('familleId', parseInt(data[0].FamilleId));

                    var userList = [];

                    for(var i=0; i < data.length; i++){
                        var userTempo = data[i].Username;
                        userList.push(userTempo);
                    }

                    localStorage.setItem('familleUser', userList);
                }

                
            })
        }
    })
}