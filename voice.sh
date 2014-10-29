#!/bin/sh
espeak -k220 -s 120 -p 10 -v english-us "$1" --stdout | aplay &
espeak -k999  -s 120 -p 50 -v english-us "$1" --stdout | aplay