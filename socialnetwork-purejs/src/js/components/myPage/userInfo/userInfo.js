const userInfo = (data) => {
  if (data) return ({
    html: /*html*/`
      <style>
        a{
          text-decoration: none;
          color: #050505;
          font-weight: 600;
        }
        h2 {
          margin: 10px 0px;
        }

        .padding-left10{
          padding-left: 10px;
        }
        .userInfo{
          width: 340px;
          background-color: #ffffff; 
          border: 1px gray;
          border-radius: 8px;
          padding-left: 20px;
          padding-top: 5px;
          padding-right: 20px;
          padding-bottom:20px;
        }
        .infor{
          margin: 10px 0px;	
        }
        .pointer {
          cursor: pointer;
        }
        .detailInfoBtn {
          border: none;
          width: inherit;
          border-radius: 5px;
          height: 35px;
          font-weight: bold;
        }
      </style>
      <div class="userInfo">
        <div class="intro">
          <h2>Giới thiệu</h2>
        </div>
        <div class="">							 	
          <div class="infor">
            <span>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/id4jdGYPaIP.png" alt="" height="20" width="20">
            </span>
            <span class="padding-left10" >Mã sinh viên:
              <a href="#" >
                ${data.mssv}					
              </a>
            </span>
          </div>					

          <div class="infor">
            <span>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/X_t0JnueVu-.png" alt="" height="20" width="20">
            </span>				
            <span class="padding-left10" dir="auto">Sống tại 
              <a href="#" tabindex="0">						
                ${(data.district)?((data.province)?(`<span>${data.district}, ${data.province}</span>`):(`<span>${data.district}`)):((data.province)?(`<span>${data.province}</span>`):``)}			
              </a>
            </span>
          </div>

          <div class="infor">
            <span>
            <img src="https://www.gstatic.com/images/icons/material/system/1x/mail_black_20dp.png" alt="" height="20" width="20">
              <span class="padding-left10" dir="auto">Email
                <a href="#" tabindex="0">					
                  <span>${data.email}</span>						
                </a>
              </span>
            </span>
          </div>

          <div class="infor">
            <span>
              <img src="https://www.gstatic.com/images/icons/material/system/1x/info_black_20dp.png" width="20" height="20">
            </span>				
            <span class="padding-left10" dir="auto">Giới tính 
              <a href="#" tabindex="0">					
                ${(data.gender == 1)?(`<span>Nữ</span>`):((data.gender == 0)?`<span>Nam</span>`:`Other`)}						
              </a>
            </span>
          </div>
        </div>
        
        <button class="pointer detailInfoBtn" onclick="callUpdateInfo()">
          Xem chi tiết và chỉnh sửa
        </button>
      </div>
 `,
 script:`
 
 `
})
  return ({
  html: /*html*/`
       <style>
        a{
          text-decoration: none;
          color: #050505;
          font-weight: 600;
        }
        h2{
          margin: 10px 0px;
        }

        .padding-left10{
          padding-left: 10px;
        }
        .userInfo{
          width: 340px;
          background-color: #ffffff;
          border: 1px gray;
          border-radius: 8px;
          padding-left: 20px;
          padding-top: 5px;
          padding-right: 20px;
          padding-bottom:20px;
        }
        .infor{
          margin: 10px 0px;
        }
        .pointer {
          cursor: pointer;
        }
        .detailInfoBtn {
          border: none;
          width: inherit;
          border-radius: 5px;
          height: 35px;
          font-weight: bold;
        }
      </style>
      <div class="userInfo">
        <div class="intro">
          <h2>Giới thiệu</h2>
        </div>
        <div class="">
          <div class="infor">
            <span>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/id4jdGYPaIP.png" alt="" height="20" width="20">
            </span>
            <span class="padding-left10" >Mã sinh viên:
            </span>
          </div>					

          <div class="infor">
            <span>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/X_t0JnueVu-.png" alt="" height="20" width="20">
            </span>				
            <span class="padding-left10" dir="auto">Sống tại 
            </span>
          </div>

          <div class="infor">
            <span>
            <img src="https://www.gstatic.com/images/icons/material/system/1x/mail_black_20dp.png" alt="" height="20" width="20">
              <span class="padding-left10" dir="auto">Email
              </span>
            </span>
          </div>

          <div class="infor">
            <span>
              <img src="https://www.gstatic.com/images/icons/material/system/1x/info_black_20dp.png" width="20" height="20">
            </span>				
            <span class="padding-left10" dir="auto">Giới tính 
            </span>
          </div>
        </div>
        
        <button class="pointer detailInfoBtn" onclick="callUpdateInfo()">
          Xem chi tiết và chỉnh sửa
        </button>
      </div>
  `,
})
}

export default userInfo;