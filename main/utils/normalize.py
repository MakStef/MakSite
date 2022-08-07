def get_domains():
    """
    Returns domain list
    Domain name doesn't include dot 
    """
    return (
        "com",
        "org",
        "net",
        "int",
        "edu",
        "gov",
        "mil",
        "app",
    )


def normalize_link(link: str):
    """ 
    If link do not starts with "http://" or "https://" and contains domain,
    then it adds the "http://" prefix 
    """
    dom = get_domains()
    if (link.startswith("http://www.") is False) and (link.startswith("https://www.") is False) and any(x in dom for x in link.split(".")):
        return f"http://www.{link}"
    else:
        return link
