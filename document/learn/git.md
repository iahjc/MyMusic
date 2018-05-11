## git 使用
#### git 分为工作区，暂存区，版本区
  * 初始化本地仓库
          git init
  * 查看仓库状态
          git status
  * 想暂存区中添加文件
          git add
  * 保存仓库的历史记录
          git commit
  * 修改修改上一条提交信息
          git commit --amend
  * 压缩历史即合并历史记录 (该命令可以选定当前分支中包含HEAD(最新提交)在内的两个最新历史记录为对象，并在编辑器中打开)
          git rebase -i HEAD-2
  * 查看提交日志
          git log
  * 只显示提交信息的第一行
          git log --pretty=short
  * 只显示指定目录，文件的日志
          git log 文件名
  * 显示文件的改动
          git log -p || git log -p README.md
  * 查看更改前后的差别(查看add之后暂存区的区别)
          git diff || git diff HEAD

#### git 分支的使用
  * 显示分支一览表
        git branch
  * 创建 切换分之(如果想以当前的master分支为基础创建新的分支，我们需要用到一下命令)
        git checkout -b 分支名
  * 或者执行以下命令
        git branch 分支名  git checkout 分支名
  * 切换分支
        git checkout 分支名
  * 合并分支
        git merge --no-ff 分支名
  * 以图表形式查看分支
        git log --graph

#### git 特性分支

#### 更改提交的操作
  * 回溯历史版本(要让仓库的HEAD，暂存区，当前工作树回溯到指定状态，需要用到目标时间点的哈希值)
        git reset --hard 哈希值
  * 查看当前仓库执行过的操作的日志
        git reflog

#### 消除冲突
#### 推送至远程仓库
  * 添加远程仓库库
        git remote add origin 仓库地址
  * 推送至远程仓库
        git push -u origin 分支名
  * 强制推送至远程仓库
        git push -u origin 分支名 -f
  * 拉取分支
        git pull origin 分支名

## git的tag用法
