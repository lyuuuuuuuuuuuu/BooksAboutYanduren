# 使用Ubuntu系统在VPS中架设VPN服务

> 伴随互联网的发展，信息拥有爆炸式的增长速度及光速般的传播渗透能力，不论是善意或恶意的信息也四处蔓延。
>
> 借此，以北京邮电大学原校长[方滨兴][1]为首要设计者，创建了防火长城（GFW - Great Firewall of China），也称作中国防火墙或中国国家防火墙，指中华人民共和国政府在其管辖因特网内部建立的多套网络审查系统的总称，甚至其包含行政审查系统。
>
> 另外，实践本文中的教程需一定的动手动脑能力，脑癌晚期请绕路。

## GFW

[GFW][2] 中的主要技术包括国家入口网关的 IP 封锁、主干路由器的关键字过滤阻断、域名劫持和 HTTPS 证书过滤等 4 种。
那些被限制的网站，根本原因是因为其网站上发布了中国政府不能接受的政治等方面的内容，有些综合性或技术性的网站只是含有少量的或可能牵涉到这些信息的也会被整体封锁。例如曾经对于 Google、维基百科的全面封锁，还有对色情、青少年犯罪等网站的禁止。

**讲人话就是丫的你内容跟我国情相悖，我就封杀（墙）你。如雷贯耳脸书、推特、1024等等，想来你都听过，但是上不去，就是因为被墙了。**

## 突破防守，一起吃鸡

作为本文主要的目的就是教你架设 VPN 服务去领略下墙外的风景，俗话说墙内开花墙外香，老待在外面闻味道也不是一回事，好歹也要进去瞅瞅看。

### 第一步，购买 VPS 服务器

VPS（Virtual Private Server 虚拟专用服务器）技术，将一台服务器分割成多个虚拟专享服务器的优质服务。实现 VPS 的技术分为容器技术和虚拟化技术。在容器或虚拟机中，每个 VPS 都可以分配独立公网 IP 地址、独立操作系统，实现不同 VPS 间磁盘空间、内存、CPU 资源、进程和系统配置的隔离，为用户和应用程序模拟出“独占”使用计算资源的体验。

**简单点理解就是在你电脑中安装了一个 VM，在 VM 中你可以创建 N 个虚拟机，想装什么系统就装什么系统。**

或许，你就有疑问了，为什么我不直接买一台独立的服务器却要去买一台 VPS 呢？答案是：**VPS 便宜！**
好，VPS 科普结束。国外有一大推 VPS 提供商，你想要使用哪个公司的随便你挑选，[传送门][3]。

在挑选时只需要注意几个原则就可以了：

- 境外 VPS 服务器
- 靠谱稳定的提供商
- 独享带宽
- 系统配置无需太高，双核1G都跑的妥妥的
- 根据你的需要选择对应的流量，一种是月流量限制、一种是宽带速率

在这里我推荐使用[衡天主机][4]的产品，购买时选择美国机房。香港机房相较于美国机房，劣势在于带宽供应不足，无法保障多人的使用。从我使用下来的体验，使用美国机房的时看 1080P 的电影都妥妥的。

**购买完成后可以在系统后台查看、重设 ROOT 密码以及重装操作系统等操作。ROOT 密码作为访问远程服务器的重要依据，请妥善保管，防止泄露！**

### 第二步，安装 Ubuntu 系统

此处选择使用 PPTP 协议形式的 VPN 是因为其配置简单、网络传输速度快，但缺点在于穿透力不强。受国内环境影响，局部网络运营商可能会封锁 PPTP 端，此时请使用 L2TP 形式的 VPN。

VPS 的默认操作系统是 CentOS 5.11 32bit 版，此时你需要点击 “重装系统” 按钮并选择使用 ubuntu-14.04 64Bit 即可。大约不到 10 分钟即可重装完成。

### 第三步，配置 PPTP UFW

连接远程操作系统时需使用 SSH 命令行。
Window 默认不支持该协议，需要独立下载应用来使用，推荐使用 [PuTTY][5] 客户端，完全免费。
Mac OS 用户可以使用系统自带应用 **终端** 进行使用。

** 本文以 Mac OS 为示例，Windows 用户操作几乎一致。 **

#### 建立与服务器的远程连接

**1** 按照如下格式在终端内输入内容；

```Bash
$ ssh root@127.0.0.1 
# 上方的 127.0.0.1 需要替换成你正确的服务器地址
```

**2** 首次连接服务器时，因为其采用密钥交换的方式来完成 SSH 中的验证（当服务器的 Key 发生变化时），会出现如下提示，你只需要键入 _yes_ 并按下回车即可；

```Bash
$ The authenticity of host '127.0.0.1 (127.0.0.1)' can't be established.
ECDSA key fingerprint is SHA256:kv/jhjk789/sfsf+uhygtfrdgp0ZWDnqeKh+Oq2Krqc.
Are you sure you want to continue connecting (yes/no)? yes
```

**3** 此时系统会要求你输入 _root_ 账户的密码，在输入时密码处于不可见状态，输入完成后按下回车键即可；

```Bash
$ root@127.0.0.1's password: 
```

**4** 密码正确时，终端会显示如下提示。

```Bash
$ Welcome to Ubuntu 14.04.5 LTS (GNU/Linux 3.13.0-24-generic x86_64)
# 如果我们的版本号不一致，会有略微差异，不影响后续教程和使用。
```

#### 配置 VPN 服务环境

**1** 更新系统应用，这一步必须执行，否则某些依赖项无法运行；

```Bash
$ sudo apt-get update
$ sudo apt-get dist-upgrade
```

**2** 安装 pptpd VPN 服务器和 ufw 防火墙；

```Bash
$ sudo apt-get install pptpd ufw
```

**3** 修改防火墙的拦截规则，允许 22 和 1723 端口通过，完成后启用防火墙；

```Bash
$ sudo ufw allow 22
$ sudo ufw allow 22
$ sudo ufw enable
```

**4** 编辑 pptpd 选项，将 `refuse-pap` 、`refuse-chap` 、`refuse-mschap` 三行代码注释，并在文末添加 `ms-dns 8.8.8.8` 和 `ms-dns 8.8.4.4`；

**4.1** 打开文件 pptpd-options

```Bash
$ sudo vi /etc/ppp/pptpd-options
```

**4.2** 编辑文件

```
#refuse-pap
#refuse-chap
#refuse-mschap

ms-dns 8.8.8.8
ms-dns 8.8.4.4
```

编辑完成后使用 `:wq` 保存并退出编辑器。

**5** 编辑 IP 信息及客户端 IP 地址范围

**5.1** 打开文件 pptpd.conf

```Bash
# 打开文件
sudo vi /etc/pptpd.conf
```

**5.2** 编辑文件，在文末添加以下两行代码

```
localip 127.0.0.1（此处请输入自己服务器的 IP 地址）
remoteip 10.99.99.100-199
```

**6** 添加 VPN 用户账户信息，本地客户端使用时需要输入用户名及密码

**6.1** 打开文件 chap-secrets

```Bash
$ sudo vi /etc/ppp/chap-secrets
```

**6.2** 编辑文件以添加用户，如下格式

| 用户账号 | 协议类型 | 用户密码 | 授权 IP |
| :-----: | :-----: | :-----: | :-----: |
| yanduren | pptpd | yanduren.com | * |


```
yanduren pptpd yanduren.com *
```

一行一个用户，可以创建多个用户。未来要添加用户时也是编辑该文件，同时编辑之后需要重启 VPN 服务器。

**7** 重启 pptpd VPN 服务器

```Bash
$ sudo /etc/init.d/pptpd restart
```

**8** 编辑系统设置

**8.1** 打开文件 sysctl.conf

```
$ sudo vi /etc/sysctl.conf
```

**8.2** 编辑文件中的 `#net.ipv4.ip_forward=1`，将其前方的注释`#`符号移除，保存文件后重新加载系统设置

```Bash
$ sudo sysctl -p
```

**9** ufw 防火墙设置

**9.1** 打开文件 ufw 

```Bash
$ sudo vi /etc/default/ufw
```

**9.2** 编辑 `DEFAULT_FORWARD_POLICY = "DROP"` 中的 `DROP` 为 `ACCEPT`

```
DEFAULT_FORWARD_POLICY = "ACCEPT"
```

**10** 防火墙规则设置

**10.1** 打开文件 before.rules

```Bash
$ sudo vi /etc/ufw/before.rules
```

**10.2** 在文件起始处添加如下代码，一字不落，无需修改

```
# NAT table rules
*nat

:POSTROUTING ACCEPT [0:0]
# Allow forward traffic to eth0
-A POSTROUTING -s 10.99.99.0/24 -o eth0 -j MASQUERADE

# Process the NAT table rules
COMMIT
```

**11** 重启防火墙

```Bash
$ sudo ufw disable && sudo ufw enable
```

## 第四步，大功告成

现在打开你的电脑、手机各种智能设备，开启吃鸡之旅吧！


[1]: https://baike.baidu.com/item/%E6%96%B9%E6%BB%A8%E5%85%B4
[2]: https://baike.baidu.com/item/great%20firewall/4843556?fr=aladdin&fromid=18582731&fromtitle=GFW
[3]: https://cn.bing.com/search?q=vps&qs=n&form=QBLH&sp=-1&pq=vps&sc=0-0&sk=&cvid=7CADCC80A3B34D498627563BE88BFEA9
[4]: https://my.hengtian.cc/aff.php?aff=2074
[5]: https://www.putty.org/