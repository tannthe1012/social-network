const updateInfo = (data) => {
  if (data) return ({
    html: /*html*/`
      <style type="text/css">
        .container{
          background-color: #b00b69;
          margin:auto;
          width : 700px;
        
          padding: 25px 30px;
          border-radius: 5px;
        }
        .container .title{
          font-size: 25px;
          font-weight: 500;
          position: relative;
        }
        .container form {
          margin: 20px 0 12px 0;
        }

       .input-box .details{
          font-weight: 500;
          margin-bottom: 10px;
          display: block;
        }
      .input-box input{
          height: 45px;
          width: 100%;
          outline: none;
          border-radius: 5px;
          border: 1px solid #ccc;
          padding-left: 15px;
          font-size: 16px;
          margin-bottom: 10px;
          border-bottom-width: 2px;
          transition: all 0.3s ease;
        }
         .input-box input:focus,
         .input-box input:valid{
          border-color: #9b59b6;
        }

        form .button{
          margin: 4px;
          padding:5px 15px;
          outline: none;
          color: #fff;
          border: none;
          font-size: 18px;
          font-weight: 500;
          border-radius: 5px;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #71b7e6, #9b59b6);

        }
        form .button:hover{
          background: #9b59b6;
        }
        </style>

        <div class="container">
          <div class="title">
            <span>Update </span>
            <i class="fa fa-times icon-control exit-icon" aria-hidden="true" onclick="closeUpdateInfo()"></i>
          </div>
  
          <form onsubmit="return updateInfo()">
            <div class="input-box">
              <span class="details">
                Full Name
              </span>
              <input class="r1" type="text" name="full_name" placeholder="Your name" required readonly value= "${data.full_name}">
            </div>
            <div class="input-box">
              <span class="details">
                Email
              </span>
              <input class="r1" type="email" name="email" required readonly value="${data.email}">
            </div>
            <div class="input-box">
              <div class="row">
                <span class="details">
                  Mã sinh viên
                </span>
                <input type="text" name="MSSV" required readonly value="${data.mssv}">  
                <span class="details">
                  Giới tính
                </span>
                <input type="text" name="gender" required readonly value="${(data.gender == 0)?(`Nam`):((data.gender == 1)?(`Nữ`):(`Other`))}">
              </div>
            </div>  
            
            <div class="input-box">
              <span class="details">
                Tỉnh
              </span>
              <input type="text" name="province" placeholder="Your province" value="${data.province?data.province:(``)}">
            </div>
            <div class="input-box">
              <span class="details">
                Huyện
              </span>
              <input type="text" name="district" placeholder="Your district" value="${(data.district)?data.district:(``)}">
            </div>
            <div class="input-box">
              <span class="details">
                Slogan
              </span>
              <input type="text" name="slogan" placeholder="Your slogan" value="${(data.slogan)?data.slogan:(``)}">
            </div>
            <div class="input-box">
              <span class="details">
                Ngày sinh
              </span>
              <input type="date" name="birthday" required readonly value="${data.birthday}">
            </div>
          
            <input class="button" id="submitBtn" type="submit" value="Update">
          </form>
        </div>   
  `,
 
})

return ({
  html: /*html*/`
    <style type="text/css">
      .container{
        max-width: 350px;
        background: #fff;
        padding: 25px 30px;
        border-radius: 5px;
      }
      .container .title{
        font-size: 25px;
        font-weight: 500;
        position: relative;
      }
      .container form .user-details{
        margin: 20px 0 12px 0;
      }

      .user-details .input-box .details{
        font-weight: 500;
        margin-bottom: 10px;
        display: block;
      }
      .user-details .input-box input{
        height: 45px;
        width: 100%;
        outline: none;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding-left: 15px;
        font-size: 16px;
        margin-bottom: 10px;
        border-bottom-width: 2px;
        transition: all 0.3s ease;
      }
      .user-details .input-box input:focus,
      .user-details .input-box input:valid{
        border-color: #9b59b6;
      }

      form .button{
        margin: 4px;
        padding:5px 15px;
        outline: none;
        color: #fff;
        border: none;
        font-size: 18px;
        font-weight: 500;
        border-radius: 5px;
        letter-spacing: 1px;
        background: linear-gradient(135deg, #71b7e6, #9b59b6);

      }
      form .button:hover{
        background: #9b59b6;
      }
      @media(max-width: 584px){
        .container{
          max-width: 100%;
        }
        form .user-details .input-box{
          margin-bottom: 15px;
          width: 100%;
        }
        .container form .user-details{
          max-height: 300px;
          overflow-y: scroll;
        }
        .user-details::-webkit-scrollbar{
          width: 0;
        }
      }

    </style>
      <div class="container">
        <div class="img loading_placeholder">
          <div class="title">Update</div>
          <form action="#">
            <div class="user-details">
              <div class="input-box">
                <span class="details">
                  Full Name
                </span>
                <input class="r1" type="text" placeholder="Your name" required readonly name="fullName">
              </div>
              <div class="input-box">
                <span class="details">
                  Email
                </span>
                <input class="r1" type="email" name="email" placeholder="Your email" required readonly>
              </div>
              <div class="input-box">
                <div class="row">
                  <span class="details">
                    Mã sinh viên
                  </span>
                  <input type="text" name="MSSV" placeholder="Your Id student" required readonly>

                  <span class="details">
                    Giới tính
                  </span>
                  <input type="text" name="gender" placeholder="Nữ" required readonly>
            
              </div>
              
              <div class="input-box">
                <span class="details">
                  Tỉnh
                </span>
                <input type="text" name="province" placeholder="Your Id student" >
              </div>
              <div class="input-box">
                <span class="details">
                  Huyện
                </span>
                <input type="text" name="district" placeholder="Your Id student" >
              </div>
              <div class="input-box">
                <span class="details">
                  Slogan
                </span>
                <input type="text" name="slogan" placeholder="Your Id student">
              </div>
              <div class="input-box">
                <span class="details">
                  Ngày sinh
                </span>
                <input type="date" name="birthday" placeholder="Your password" required>
              </div>
            </div>
              <input class="button" id="submitBtn"type="submit" value="Update">
          </form>
        </div>
      </div>
  `,
})
}

export default updateInfo;