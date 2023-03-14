## Welcome to Pet-Lover

-----------------------------------------------------------------------

### How to use

New Update  
设置环境变量，目前有2个环境  
环境一 UAT环境(测试环境) 默认会连接到测试环境，即当你打开 https://uat.hellokitty.petlover2023.com/login  
就能使用我们的app，无需手动连接前后端。

环境二 Dev环境 我们的开发环境。按照下面的步骤配置

1. git pull // 先更新前端的develop
2. git install // 会自动安装dotenv, dotenv-cli, react-scripts三个包
3. 根目录下添加.env 文件 里面加上 REACT_APP_API_ENDPOINT=https://uat-api.hellokitty.petlover2023.com
4. 根目录下添加.env.local 文件 里面加上 REACT_APP_API_ENDPOINT=http://localhost:8080
5. 启动后端server
6. 前端执行 npm run dev