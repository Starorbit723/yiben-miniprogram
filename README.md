#课程
## 字段
1. schoolid
2. detail
3. updateTime
## 接口
1. 根据校区id查询整条数据 （小程序、后管）
2. 根据校区id保存或者新增一条数据 （后管）

#用户
## 字段
1. yibenid
2. openid
3. unionid
4. children
	1. name
	2. age
	3. gender
5. nickName
6. parentName
7. phoneNumber
8. point
9. avatarUrl
10. city
11. country
12. province
13. gender
14. language
15. age
16. userType 1 客户 2 员工
## 接口
1. 登录 ，获取openid 并检查是否为存量客户，不过不是，创建新用户 （yb_xxxxxxx）
	1. 入参 无
	2. 返回 {openid, yibenid, unionid, 所有其他可用信息}
2. 客户信息补全 （通过小程序能力获取客户微信相关信息）
	2. 入参 openid yibenid avatarUrl  city，country，province:，gender language，nickName
	3. 返回 then catch
3. 客户手动补填信息
	1. 入参 parentName, phoneNumber, 学员信息数组【姓名、年龄、性别（）】

#预约
## 字段
#### 表1
1. bookid
2. bookType 1 单人试听 2 拼团试听
3. originOpenid
4. originYibenid
5. prevOpenid
6. prevYibenid
7. ownerName
8. ownerPhone
9. ownerOpenid
10. ownerYibenid
11. schoolid
12. ownerChildren // 姓名字符串数组
13. ifPrepaid (后台改)
14. matchTeacher(后台改)
15. ifPresent(后台改)
16. receptionTeacherPhone(后台改)
17. createTime(后台改)
18. lessonTime(后台改)
19. lessonRoom(后台改)
20. status 0拼团中 1 已预约 2 校区确认中 3 待使用 4 已使用  5 已取消
#### 表2

	1. groupInfoid
	2. memberOpenid
	3. memberYibenid
	4. memberName
	5. memberChildren // 姓名字符串数组
	6. memberPhone
	7. bookid
## 接口
1. 预约接口
	1. 入参 bookType originInfo prevInfo ownerName ownerPhoneNumber
	2. 返回 bookid
2. 保存拼团信息
	1. 入参 bookid groupInfo（单条) ，校验当前拼团数量 <= 3 是否为发起人如果是校验住
	2. 返回成功与否，码值 原因
3. 查询单个预约信息
	1. 入参 bookid
	2. 完整预约信息
4. 当前用户预约
	1. 先查是否为发起人，如果有发起人订单还需要继续查参团人信息
	2. 再查是否为参团人，分别查出主预定id 参团信息


#资源管理
记录通过对象存储api上传的资源文件的信息
## 字段
1. url 资源地址
2. fileId 文件id
3. createTime 上传时间
4. type 资源类型 1 图片 2 视频
5. name 资源名称
