# What is Docker all about?

To keep it simple, Docker is a tool that provides virtualizationn functionalities, like Virtual Machines do, without much of hassle of having an actual Virtual Machine running. 

**Why I would need that anyway?**

Because this virtualization functionality provides a way to avoid much of the trouble of having to install multiple software with potentially different versions, in potentially different machines, with potentially different requirements for each version and machine. 

Docker avoids that by making available an image that can be used in any machine; an image that prior to its release has been configured to include all the needs a software (to be installed) requires to run.

# Getting started

To install Docker on your machine, follow the guidelines at the Docker official docs for your Operating System (i.e. [Docker Engine Install on Ubuntu](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) or [Docker Desktop Install on Ubuntu](https://docs.docker.com/desktop/install/ubuntu/)).

!!! success "Install Docker"
    While Docker have improved the user experience to get along with the installation process, be aware that there might be issues during the installation process if you decide to install the Docker engine in Linux. For an easier installation process, install Docker Desktop for Linux.

# Web apps

I'm following the great tutorial by [Prakhar Srivastav](https://docker-curriculum.com/), so check it out for more detailed information.

Let's learn some useful Docker commands and flags with an example:

!!! failure "Docker command"
    docker run -d -P --name static-site prakhar1989/static-site

The `run` command tells Docker to run a container on the specified image. The image is specified by the `prakhar1989/static-site`. Since there is no local image with that nname, Docker searchs for it in the Docker Hub and pulls it to the local machine.

The `-d` flag tells Docker to run the container in `detach mode`, meaning that the terminal won't be blocked after executing the `run` command and the container will still be running.

The `-P` flag publish all exposed ports to random ports. Since the image pulled refers to a static web app, there has to be an exposed port where to run the app. With this flag Docker assigns a random port to the exposed port.

Finally, the `--name` flag just allows us to give to the container (in the example above, `static-site`).

To check which port was assigned, let's run:

!!! failure "Check app port in Docker container"
    docker port static-site

To stop the container at any moment run:

!!! failure "Stop the container"
    docker stop static-site

# Create an image

Before creating an image it is worth remembering that any Docker image created by an user is based on a *base Docker image*. An example of a base Docker image is the `Python3` Docker image.