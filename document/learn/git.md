#### git 使用
#### git 分为工作区，暂存区，版本区
<ol>
  <li>初始化本地仓库</li>
  <li>git init</li>
  <li>查看仓库状态</li>
  <li>git status</li>
  <li>想暂存区中添加文件</li>
  <li>git add</li>
  <li>保存仓库的历史记录</li>
  <li>git commit</li>
  <li>修改修改上一条提交信息</li>
  <li>git commit --amend</li>
  <li>压缩历史即合并历史记录 (该命令可以选定当前分支中包含HEAD(最新提交)在内的两个最新历史记录为对象，并在编辑器中打开)</li>
  <li>git rebase -i HEAD-2</li>
  <li>查看提交日志</li>
  <li>git log</li>
  <li>只显示提交信息的第一行</li>
  <li>git log --pretty=short</li>
  <li>只显示指定目录，文件的日志</li>
  <li>git log 文件名</li>
  <li>显示文件的改动</li>
  <li>git log -p || git log -p README.md</li>
  <li>查看更改前后的差别(查看add之后暂存区的区别)</li>
  <li>git diff || git diff HEAD</li>
</ol>
#### git 分之的使用
<ol>
  <li>显示分支一览表</li>
  <li>git branch</li>
  <li>创建 切换分之(如果想以当前的master分支为基础创建新的分支，我们需要用到一下命令)</li>
  <li>git checkout -b 分支名</li>
  <li>或者执行以下命令</li>
  <li>git branch 分支名  git checkout 分支名</li>
  <li>切换分支</li>
  <li>git checkout 分支名</li>
  <li>合并分支</li>
  <li>git merge --no-ff 分支名</li>
  <li>以图表形式查看分支</li>
  <li>git log --graph</li>
</ol>
#### git 特性分支
#### 更改提交的操作
<ol>
  <li>回溯历史版本(要让仓库的HEAD，暂存区，当前工作树回溯到指定状态，需要用到目标时间点的哈希值)</li>
  <li>git reset --hard 哈希值</li>
  <li>查看当前仓库执行过的操作的日志</li>
  <li>git reflog</li>
</ol>
#### 消除冲突
<ol>
  <li></li>
</ol>
