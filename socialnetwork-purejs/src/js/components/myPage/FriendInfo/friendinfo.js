const friendinfo = (data) => {
  if (data) return ({
    html: /*html*/`
      <style>
        .list_fr{
            width: 340px;
            padding:20px;
            margin-top:10px;
            border-radius: max(0px, min(8px, ((100vw - 4px) - 100%) * 9999)) / 8px;
            width: 340px;
            background-color: #ffffff;
            font-family: Helvetica, Arial, sans-serif;
            font-family: inherit;
        }
        .list_body {
            position: center;
            border-radius: max(0px, min(8px, ((100vw - 4px) - 100%) * 9999)) / 8px;
            width: 320px; 
            
        }
        .list_intro {
            display: flex;
            flex-direction: column;
            margin: 0px;
        }
        .list_fr .list_intro .list_intro1{
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-bottom:0px;
            margin-bottom: 0px;
        }
        .list_fr .list_intro .list_intro2{
            font-weight: lighter;
            padding: 8px;
        }
        .text_list{
            padding: 8px;
            font-size: 20px;
        }
        .list_link span{
            -webkit-box-orient: vertical; 
            -webkit-line-clamp: 2; 
            display: -webkit-box;
        }

        .col{
            padding-right: 8px;
        }
        .friend .imageList{
            width: 100px;
            height: 100px;
            border-radius: 8px;
            background-color: pink;
            object-fit: cover;
        }
        .friend .nameFriend{
            width: 100px;
        }
        .grid-container{
            display: grid;
            grid-template-columns: auto auto auto;
        }  
      </style>
      <div class="list_fr">
          <div class="list_intro">
            <div class="list_intro1">
              <div>
                <div class="text_list" dir="auto" style="font-weight: bold;">
                  <span >
                    <a class="list_link" href="#" is="router-link" role="link" tabindex="0">Bạn bè</a>
                  </span>
                </div> 
              </div>
              <div>
                <div class="text_list">
                  <span>
                    <a href="#" role="link" tabindex="0" is="router-link">
                      <span style="color: darkblue;">Xem tất cả</span>
                    </a>
                  </span> 
                </div>
              </div>   
            </div>
            <div class="list_intro2">
              <span>
                ${data.friends.total} người bạn
              </span>
            </div>
          </div>
        
          <div class="grid-container">
            ${data.friends.data.map((friendInfo) => (`
                <div class="col flex">
                    <a href="/users/${friendInfo.id}" class="friend flex-column" is="router-link">
                        <img src="${friendInfo.avatar_name}" alt="" class="imageList">
                        <span class="nameFriend">${friendInfo.full_name}</span>
                    </a>
                </div>`)
    ).join("")}
        </div>  
      `,
  })
  return ({
    html: /*html*/`
      `,
  })
}

export default friendinfo;