// 保存角色配置信息
exports.main = async (params, db) => {
  // 参数校验
  if (!params) {
    return {
      success: false,
      errMsg: '缺少参数'
    };
  }

  const { roleConfigid, yibenid, name, phoneNumber, roleList } = params;

  // 检查必要参数
  if (!name || !phoneNumber || !roleList || !Array.isArray(roleList)) {
    return {
      success: false,
      errMsg: '缺少必要参数或格式不正确：name, phoneNumber, roleList (must be an array)'
    };
  }

  const currentTime = Date.now();

  // 构建存储对象
  const roleConfigData = {
    yibenid,
    name,
    phoneNumber,
    roleList,
    updateTime: currentTime // updateTime is set on every save/update
  };

  try {
    // 获取角色配置表引用
    const roleConfigCollection = db.collection('role_config');
    
    if (roleConfigid) {
      // 更新现有角色配置
      const existingRoleConfig = await roleConfigCollection.where({
        roleConfigid: roleConfigid
      }).get();

      if (existingRoleConfig.data.length > 0) {
        // Preserve createTime, only update relevant fields and updateTime
        const updateData = {
          yibenid,
          name,
          phoneNumber,
          roleList,
          updateTime: currentTime
        };

        await roleConfigCollection.where({
          roleConfigid: roleConfigid
        }).update({
          data: updateData
        });
        
        return {
          success: true,
          message: '角色配置信息更新成功',
          roleConfigid: roleConfigid
        };
      } else { 
        return {
          success: false,
          errMsg: '角色配置不存在，无法更新'
        };
      }
    }

    // 新增角色配置
    // 生成新的roleConfigid
    const newRoleConfigId = generateId(); // Reusing generateId function
    roleConfigData.roleConfigid = newRoleConfigId;
    roleConfigData.createTime = currentTime; // Set createTime only for new records

    await roleConfigCollection.add({
      data: roleConfigData
    });
    
    return {
      success: true,
      message: '角色配置信息保存成功',
      roleConfigid: newRoleConfigId
    };
  } catch (err) {
    console.error('保存角色配置信息失败:', err);
    return {
      success: false,
      errMsg: err.message || '保存角色配置信息失败'
    };
  }
};

// 生成随机的16位ID (copied from questionnaireSave)
function generateId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
} 