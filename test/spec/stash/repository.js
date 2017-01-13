var repository = require('../../../stash/repository');

describe('Repository URL parser', function () {
    it('should parse SSH url from package.json', function () {
        var url = repository.parseUrl('ssh://git@stash.domain.com/foo/bar-name.git');

        expect(url).to.have.deep.property('project.name', 'foo');
        expect(url).to.have.deep.property('project.path', '/projects/foo');

        expect(url).to.have.deep.property('repository.name', 'bar-name');
        expect(url).to.have.deep.property('repository.path', '/repos/bar-name');
    });
    it('should parse HTTP url from package.json', function () {
        var url = repository.parseUrl('http://stash.domain.com/projects/foo/repos/bar.git');

        expect(url).to.have.deep.property('project.name', 'foo');
        expect(url).to.have.deep.property('project.path', '/projects/foo');

        expect(url).to.have.deep.property('repository.name', 'bar');
        expect(url).to.have.deep.property('repository.path', '/repos/bar');
    });
    it('should handle /scm/:project/:repo format URL', function () {
      var url = repository.parseUrl('http://stash.domain.com/scm/npme/ci-demo-stash.git');

      expect(url).to.have.deep.property('project.name', 'npme');
      expect(url).to.have.deep.property('project.path', '/projects/npme');

      expect(url).to.have.deep.property('repository.name', 'ci-demo-stash');
      expect(url).to.have.deep.property('repository.path', '/repos/ci-demo-stash');
    })

    it('should handle personal repo url in ssh format', function () {
      var url = repository.parseUrl('ssh://git@hostname.compute.cloud.com:7999/~andrew.goode/hello-world.git')

      expect(url).to.have.deep.property('project.name', '~andrew.goode')
      expect(url).to.have.deep.property('project.path', '/projects/~andrew.goode')

      expect(url).to.have.deep.property('repository.name', 'hello-world')
      expect(url).to.have.deep.property('repository.path', '/repos/hello-world')
    })

    it('should handle personal repo url in http format', function () {
      var url = repository.parseUrl('http://andrew.goode@hostname.compute.cloud.com/scm/~andrew.goode/hello-world.git')

      expect(url).to.have.deep.property('project.name', '~andrew.goode')
      expect(url).to.have.deep.property('project.path', '/projects/~andrew.goode')

      expect(url).to.have.deep.property('repository.name', 'hello-world')
      expect(url).to.have.deep.property('repository.path', '/repos/hello-world')
    })

    it('should handle url in http format without .git', function () {
      var url = repository.parseUrl('http://andrew.goode@hostname.compute.cloud.com/scm/~andrew.goode/hello-world')

      expect(url).to.have.deep.property('project.name', '~andrew.goode')
      expect(url).to.have.deep.property('project.path', '/projects/~andrew.goode')

      expect(url).to.have.deep.property('repository.name', 'hello-world')
      expect(url).to.have.deep.property('repository.path', '/repos/hello-world')
    })

    it('should handle dot in repo name', function () {
      var url = repository.parseUrl('ssh://git@hostname.compute.cloud.com:7999/~andrew.goode/one.two.git')

      expect(url).to.have.deep.property('project.name', '~andrew.goode')
      expect(url).to.have.deep.property('project.path', '/projects/~andrew.goode')

      expect(url).to.have.deep.property('repository.name', 'one.two')
      expect(url).to.have.deep.property('repository.path', '/repos/one.two')
    })
});
