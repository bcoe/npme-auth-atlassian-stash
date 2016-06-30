var url = require('url');

function getProjectData(_repositoryUrl) {
    var project = _repositoryUrl.match(/^\/(projects|scp)\/([a-z0-9_\-]+)/i);
    if (project !== null) {
        return {
            path: '/projects/' + project[2],
            name: project[2]
        };
    }
}

function getRepositoryData(_repositoryUrl) {
    var repo = _repositoryUrl.match(/\/([a-z0-9_\-]+)(\.git)?$/i);
    if (repo !== null) {
        return {
            path: '/repos/' + repo[1],
            name: repo[1]
        };
    }
}

function parseRepositoryUrl(_repositoryUrl) {
    var repositoryUrl = url.parse(_repositoryUrl);
    var sshFormat = repositoryUrl.pathname.match(/^\/([a-z0-9_\-]+)\/([a-z0-9_\-]+)\.git$/i);

    if (sshFormat === null) {
        repositoryUrl.project = getProjectData(repositoryUrl.pathname);
        repositoryUrl.repository = getRepositoryData(repositoryUrl.pathname);
    }
    else {
        repositoryUrl.project = getProjectData('/projects/' + sshFormat[1]);
        repositoryUrl.repository = getRepositoryData('/repos/' + sshFormat[2]);
    }

    return repositoryUrl;
}

exports.parseUrl = parseRepositoryUrl;
