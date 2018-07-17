## Preface

I would be fooling myself if I claim to be proficient in Linux command line. So I took the [Linux Command Line video course](https://www.safaribooksonline.com/videos/linux-command-line/9780134445533) to enhance my knowledge in the area. 

## [ls](http://man7.org/linux/man-pages/man1/ls.1.html): list directory content

Userful Options:

| Option  | Meaning
| :---: | :---: |
| -l | use a long listing format |
| -a | do not ignore entries starting with . |
| -h | with -l, print sizes in human readable format (e.g. 1K 234M 2G) | 

## [whatis](http://man7.org/linux/man-pages/man1/whatis.1.html): displays short manual page descriptions

```bash
whatis cp

// output:
cp(1) - copy files
```

## [file](http://man7.org/linux/man-pages/man1/file.1.html): find the type of a file

```bash
file README.md

// output:
README.md: ASCII text
```

## [head](http://man7.org/linux/man-pages/man1/head.1.html): output the first part of file

Userful Options:

| Option  | Meaning
| :---: | :---: |
| -n | specify the number of first lines to print |

## [tail](http://man7.org/linux/man-pages/man1/tail.1.html): output the last part of file

Userful Options:

| Option  | Meaning
| :---: | :---: |
| -n | specify the number of last lines to print |
| -f | loop forever, checking for new data at the end of the file(s)|

## [wildcard](https://www.computerhope.com/jargon/w/wildcard.htm): a symbol used to replace or represent one or more characters.

| wildcard  | Meaning
| :---: | :---: |
| * | The asterisk in a wildcard matches any character zero or more times |
| ? | A question mark matches a single character once|
| [] | match a single character in a range |


```bash
touch chapters{1,2,3}.txt

// will create chapters1.txt, chapters2.txt and chapters3.txt 
```

## [tar](http://man7.org/linux/man-pages/man1/tar.1.html): create, maintain, modify, and extract files that are archived in the tar format.

Userful Options:

| Option | Meaning | Example
| :---: | :---: | :---: |
| -c | create a new archive. | tar -cf archive.tar file1 file2 |
| -f | use archive file or device ARCHIVE |
| -v | verbosely list files processed. |
| -x | untar tar archive file | tar -cvf archive.tar

## [gzip](https://www.computerhope.com/unix/gzip.htm): compress

## [wget](http://man7.org/linux/man-pages/man1/wget.1.html): download file over network.

Userful Options:

| Option | Meaning | Example
| :---: | :---: | :---: |
| -O | specify output | wget -O file http://foo |


## [id](http://man7.org/linux/man-pages/man1/id.1.html): prints real and effective user and group ID
```bash
uid=501(michaelzheng) gid=20(staff) groups=20(staff),12(everyone)
```

## [groups](http://man7.org/linux/man-pages/man1/groups.1.html): show group memberships
```bash
groups
//staff everyone 
```

## [whoami](http://man7.org/linux/man-pages/man1/whoami.1.html): prints the effective user

```bash
whoami
//michaelzheng
```

## [chmod](http://man7.org/linux/man-pages/man1/chmod.1.html): change the permissions of files or directories

For a file with listing like this:

```
-rw-r--r--   1 michaelzheng  staff  1983 Jul 17 16:17 README.md
```

The first char is the type. The 2-4 is the owner permission for reading, writing and execution respectively. 5-6 is for group members and 9-11 is for others. Taking the example above for illustration:

* -: normal file
* rw-: owner(i.e. michaelzheng) can read and write
* r--: groups members can only read
* r--: others can only read

To change each permission group, we can convert binary representation to octal format.

| r | w | e |
| :---: | :---: | :---: |
| 4(i.e. 2^2) | 2(i.e. 2^1) | 1(i.e. 2^0) |

Therefore, if I want to grant owner rwx(4 * 1 + 2 * 1 + 1 * 1 = 7), group member rx(4 * 1 + 2 * 0 + 1 * 1 = 5) and others r (4 * 1 + 2 * 0 + 1 * 0 = 4) then i can use

```bash
chmod 750 README.md
```

## [ps](http://man7.org/linux/man-pages/man1/ps.1.html): displays information about a selection of the active processes

## [jobs](http://man7.org/linux/man-pages/man1/jobs.1p.html): display status of jobs in the current session

## [fg](http://man7.org/linux/man-pages/man1/fg.1p.html): run jobs in the foreground

## [bg](http://man7.org/linux/man-pages/man1/bg.1p.html): run jobs in the background

## [df](http://man7.org/linux/man-pages/man1/df.1.html): report file system usage

Useful options:

| Option | Meaning |
| :---: | :---: |
| -h | print sizes in human readable format |

```bash
du -h

//output: 
Filesystem      Size   Used  Avail Capacity iused      ifree %iused  Mounted on
/dev/disk1     112Gi   97Gi   15Gi    87% 2771640 4292195639    0%   /
devfs          182Ki  182Ki    0Bi   100%     630          0  100%   /dev
map -hosts       0Bi    0Bi    0Bi   100%       0          0  100%   /net
map auto_home    0Bi    0Bi    0Bi   100%       0          0  100%   /home

```

## [du](http://man7.org/linux/man-pages/man1/df.1.html): estimate file space usage

Useful options:

| Option | Meaning |
| :---: | :---: |
| -h | print sizes in human readable format |
| -s |  display only a total for each argument |

## Reference 

* [Linux Command Line](https://www.safaribooksonline.com/videos/linux-command-line/9780134445533)

## Notice

* If you want to follow the latest news/articles for the series of reading notes, Please [「Watch」](https://github.com/n0ruSh/the-art-of-reading)to Subscribe.