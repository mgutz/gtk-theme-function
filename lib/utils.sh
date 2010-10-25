# Copyright (c) 2010 (c) Mario L Gutierrez
#
# Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
#
# Credit:
#     http://nerdstock.org/color_bash?lang=en
#     http://www.linuxquestions.org/questions/programming-9/how-can-i-compare-floating-number-in-a-shell-script-336772/#post3913026

#
# INIT VARS
#
declare -a colors

colors[1]='\E[31m\033[1m'
colors[2]='\E[34m\033[1m'
colors[3]='\E[37m\033[1m'
colors[4]='\E[33m\033[1m'
colors[5]='\E[30m\033[1m'
colors[6]='\E[32m\033[1m'
colors[7]='\E[35m\033[1m'
colors[8]='\E[36m\033[1m'

declare -a color_names
color_names='red blue white yellow black green magenta cyan'

export reset_screen='echo -n -e \033[0m'

#
# FUNCTIONS
#

cecho () { # Color-echo Argument $1 = message Argument $2 = color $3 = no break

    default_msg="No message passed."

    message=${1:-$default_msg}   # Defaults to default message.

    use_color=''

    if [ "$2" == "" ];then
        use_color=${colors[3]}
    else
        i=1
        for color in $color_names;do
            if [ "$color" == "$2" ]; then
                use_color=${colors[${i}]}
            fi
            ((i=${i}+1))
        done
    fi
    if [ "$use_color" == "" ];then
        echo 'unknown color';
    fi

    echo_cmd='echo'
    if [ "$3" == "false" ];then
        echo_cmd='echo -n'
    fi
    echo -n -e "$use_color"
    $echo_cmd "$message"
    
    $reset_screen
    return
}

cbracket() { # $1 = label $2 = color
    cecho '[' white false
    cecho "$1" $2 false
    cecho "] " white false
}


cok() {
    cecho '     OK ' green false
    echo $1 
}

cinfo() {
    cecho '   INFO ' yellow false
    echo $1 
}

cerror() {
    cecho '  ERROR ' red false
    echo $1 
}


cwarn() {
    cecho '   WARN ' magenta false
    echo $1 
}

cstart() {
    cecho 'START   ' blue false
    echo $1 
}

cend() {
    cecho 'END     ' blue false
    echo $1 
}

cmore() {
    echo "        $1"
}

ccheck() {
    if [ $1 -ne 0 ]; then
        cerror "$2"
        exit $1
    fi
}

### Float functions

# Return the value of an operation
fval() {
     echo | awk 'END { print '"$1"'; }'
}


# Return status code of a comparison
ftest() {
     echo | awk 'END { exit ( !( '"$1"')); }'
}
