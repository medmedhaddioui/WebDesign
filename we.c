#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>

int main ()
{
    int fd;
    fd = dup(1);
    write(fd , "helo", 4);
    printf("%d\n", fd );
    return 0; 
}