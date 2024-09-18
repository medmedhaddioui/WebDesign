/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   exam.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: medmed <medmed@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/09/18 16:10:14 by medmed            #+#    #+#             */
/*   Updated: 2024/09/18 17:29:26 by medmed           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
# include <stdlib.h>
# include <sys/wait.h>

int ft_strlen (char *s)
{
    int i;
    i = 0 ;
    while  (s[i])
    {
        i++;
    }
    return i;
}
void ft_error(char *s)
{
    write (2, s , ft_strlen(s));
    write (1,"\n",1);
    return ;
}
void child (char **av, char **envp ,int *fds)
{
    
    close (fds[0]);
    if (dup2(fds[1], 1) == -1)
    {
        ft_error("Error in dup2");
        exit(1);  
    }
    close (fds[1]);

    const char *path = av[1];
    if (execve(path, &av[1], envp) == -1)
    {
        ft_error("Error in execve1");
        exit(1);
    }
}
void parent_child (char **av, char **envp ,int *fds)
{
    
    close (fds[1]);
    if (dup2(fds[0], 0) == -1)
    {
        ft_error("Error in dup2");
        exit(1);  
    }
    close (fds[0]);

    const char *path = av[3];
    if (execve(path, &av[3], envp) == -1)
    {
        ft_error("Error in execve2");
        exit(1);
    }
}
void parent (pid_t *id , char **av , char **envp, int *fds)
{   
    *id  = fork();
    if (*id == -1)
        return (ft_error("Error in fork"));
    if (*id == 0)
        parent_child  (av,envp,fds);
    close (fds[1]);
    close (fds[0]);
    
}
int main (int ac , char **av , char **envp)
{
    int status;
    if (ac == 1)
        return (ft_error("Bad arguments "), 1) ;
    int fds[2];
    if (pipe(fds) == -1)
        return (ft_error ("Error in pipe"), 1);
    pid_t id;
    id  = fork();
    if (id == -1)
        return (ft_error("Error in fork"), 1);
    if (id == 0)
        child (av, envp, fds);
    else
    {
        parent(&id ,av, envp, fds);
    }
    waitpid  (id, &status ,0);
    if (WIFEXITED(status))
		return (WEXITSTATUS(status));
}
