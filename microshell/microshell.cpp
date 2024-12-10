#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <sys/wait.h>
void err (char *s)
{
    while (s)
    {
        write(2, s, 1);
        *s++;
    }
}
void exec (char **av , int i, char **env)
{
    av[i] = NULL;
}
int main (int ac , char **av , char **env)
{
    int fds;
    (void ) ac;
    int i;
    i = 0;
    int tmp_fd = dup(0);
    while (av[i] && av[i + 1])
    {
        av[i] = av[i] + 1;
        while (av[i] && (strcmp(av[i], ";") || strcmp(av[i], "|")))
            i++;
        if (!strcmp(av[0], "cd"))
        {
            if (i != 2)
                err("error: cd: bad arguments\n");
            if (chdir(av[1]) < 0 )
                err("error: cd: cannot change directory to "), err(av[1]), err("\n");
        }
        while (i != 0 && (av[i] !=  NULL && !strcmp(av[i], ";")))
        {
            if (fork () == 0 )
            {
                exec(av, av[i]);
                close (0);
                close (tmp_fd);
            }
            else 
            {
                
            }
        }
    }
}