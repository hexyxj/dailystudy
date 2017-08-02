### gitNote
----
- 1.git init
    初始化一个Git仓库，使用git init命令。

----
添加文件到Git仓库，分两步：
- 2.git add <filename>||git add .
    用命令git add <file>，注意，可反复多次使用，添加多个文件；
    git add . 添加所有文件
- 3.git commit -m 'msg'

    把文件提交到仓库，并输入本次提交的说明

----
- 4.git status

    查看仓库当前的状态
- 5.git diff 

    如果git status告诉你有文件被修改过，用git diff可以查看修改内容。

----
- 6.git log 

    查看从最近到最远的提交日志
    get log --pretty=oneline
----
- 7.git reset --hard HEAD^

    Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，
    上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。
    HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。
    穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。
    要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本。
   
    用命令git reset HEAD file可以把暂存区的修改撤销掉（unstage），重新放回工作区：
----
- 8.cat <filename>

    查看文件内容
----
- 9.git reflog    

    查看每一次命令
----
- 10.git checkout -- filename

    命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：
    一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
    一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
    总之，就是让这个文件回到最近一次git commit或git add时的状态。

    场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。
    场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。
    场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。
----
- 11.branch

    查看分支：git branch
    创建分支：git branch <name>
    切换分支：git checkout <name>
    创建+切换分支：git checkout -b <name>
    合并某分支到当前分支：git merge <name>
    删除分支：git branch -d <name>