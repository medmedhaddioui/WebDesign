/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   exam.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mel-hadd <mel-hadd@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/09/18 16:10:14 by medmed            #+#    #+#             */
/*   Updated: 2024/09/20 18:30:19 by mel-hadd         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
# include <stdlib.h>
# include <sys/wait.h>

int ft_strlen(char *s)
{
    int i = 0;
    while (s[i])
        i++;
    return i;
}

void ft_error(char *s)
{
    write(2, s, ft_strlen(s));
}

void child(int index, int len, char **av, char **envp, int *fds, int is_last)
{
    if (!is_last)
    {  
       if (dup2(fds[1], 1)  == -1)
            ft_error("error: fatal\n"), exit(1);
    }
    close(fds[0]);
    close(fds[1]);
    av[len] = NULL;
    execve(av[index], av, envp);
    ft_error("error: cannot execute "), ft_error(av[index]), ft_error("\n"), exit(1);
}

int cd(char **argv, int index , int len)
{ 
    if ((len - index) != 2)
        return ft_error("error: cd: bad arguments\n"), 1;
    argv[len] = NULL;
    if (chdir(argv[1]) == -1)
        return ft_error("error: cd: cannot change directory to "), ft_error(argv[1]), ft_error("\n"), 1;
    return 0;
}

int exec_cmd(int index, int len, char **av, char **envp, int *fds, int is_last, int save)
{
    pid_t id;
    if (is_last && !strcmp(av[index], "cd"))
        return (cd (av, index,len));
    if (is_last == 2)
    {
        if (dup2(save , 0) == -1)
            ft_error("error: fatal\n"), exit(1); 
    }
    if ((id = fork()) == -1)
        ft_error("error: fatal\n"), exit(1);
    if (id == 0)
        child(index, len, av, envp, fds, is_last);
    close(fds[1]);
    if (is_last == 0)
    {
        if (dup2(fds[0], 0) == -1)
            ft_error("error: fatal\n"), exit(1);
    }
    close(fds[0]);
    int status;
    waitpid(id, &status, 0);
    if (WIFEXITED(status))
        return (WEXITSTATUS(status));
    return 0;
}

int main(int ac, char **av, char **envp)
{
    if (ac == 1)
        return 1;
    av = av + 1;
    int i = 0;
    int j = 0;
    int fds[2];
    int exit = 0;
    int save = dup (0);
    while (av[i])
    {
        j = i;
        while (av[j] && strcmp(av[j], "|") && strcmp(av[j], ";"))
            j++; 
        if (j == 0)
        {
            av += j + 1;
            i = 0;
            continue;
        }
        if (pipe(fds) == -1)
            return (ft_error("error: fatal\n"), 1);
        if (av[j] && !strcmp(av[j], "|"))
            exit = exec_cmd(i, j, av, envp, fds, 0, -1); 
        else if (!av[j])
            return (exec_cmd(i, j, av, envp, fds, 1, save));
        else
            exit = exec_cmd(i, j, av, envp, fds, 2, save);
        av += j + 1;
        i = 0;
    }
    return exit;
}