#include <stdio.h>
#include <sys/wait.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

void err(char *s)
{
    int i; 
    i = -1;
    while (s[++i])
        write(2, &s[i], 1);
}
void exec( char ** av, int i , int tmp_fd, char **env)
{
    av[i] = NULL;
    dup2(tmp_fd , 0);
    close (tmp_fd);
    execve(av[0] , av , env);
    err("error: cannot execute ") , err(av[0]), err("\n");
    exit(1);
}

int main (int ac , char **av, char **env)
{
    int i = 0;
    int fds[2];
    int tmp_fd;
    tmp_fd = dup(0);
    (void) ac ;
    while (av[i] && av[i + 1])
    {
        av = &av[i + 1];
        i = 0;
        while (av[i] && strcmp(av[i] , ";") && strcmp(av[i] , "|"))
            i++;
        if (!strcmp(av[0], "cd"))
        {
            if (i != 2)
                err("error: cd: bad arguments\n");
            else if (chdir(av[1]) != 0)
                err("error: cd: cannot change directory to ") , err(av[1]) , err("\n");
        }
        else if(i != 0 && (av[i] == NULL || !strcmp(av[i], ";")))
        {
            if (fork() == 0)
                exec(av, i , tmp_fd, env);
            else
            {
                close (tmp_fd);
                while (waitpid(-1, NULL, 0) != -1)
                    ;
                tmp_fd = dup(0);
            }
        }
        else if (i != 0 && !strcmp(av[i], "|"))
        {
            pipe(fds);
            if (fork() == 0)
            {
                dup2(fds[1], 1);
                close (fds[0]);
                close (fds[1]);
                exec(av, i , tmp_fd, env);
            }
            else
            {
                close (fds[1]);
                close (tmp_fd);
                tmp_fd = fds[0];
            }
        }
    }
    close (tmp_fd);
    return 0;
}